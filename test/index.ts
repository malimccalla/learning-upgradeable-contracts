import { expect } from "chai";
import hre from "hardhat";

describe("Base", function () {
  xit("UUPS", async function () {
    const Base = await hre.ethers.getContractFactory("Base");
    // Without the { kind: "uups" } we would default to using the transparent proxy pattern
    const janeProxy = await hre.upgrades.deployProxy(Base, ["Jane"], {
      kind: "uups",
    });

    const bobProxy = await hre.upgrades.deployProxy(Base, ["Bob"], {
      kind: "uups",
    });

    expect(await janeProxy.name()).to.equal("Base");
    expect(await janeProxy.title()).to.equal("Jane");
    expect(await bobProxy.title()).to.equal("Bob");
    // --- time passes, build out features, get funding...
    // Oh we need to write more features in our smart contract
    const BaseV2 = await hre.ethers.getContractFactory("BaseV2");
    // So we call upgradeProxy
    const janeProxyv2 = await hre.upgrades.upgradeProxy(janeProxy, BaseV2);

    expect(await janeProxyv2.version()).to.equal("v2");
    expect(await janeProxyv2.version()).to.equal("v2");
    // -- time passes again

    const BaseV3 = await hre.ethers.getContractFactory("BaseV3");
    const baseV3 = await hre.upgrades.upgradeProxy(janeProxy, BaseV3);

    expect(await baseV3.version()).to.equal("v3");
  });

  it("B.Proxies", async function () {
    const Base = await hre.ethers.getContractFactory("Base");
    const beacon = await hre.upgrades.deployBeacon(Base);

    const janeProxy = await hre.upgrades.deployBeaconProxy(beacon, Base, [
      "Jane",
    ]);

    await janeProxy.deployed();

    const bobProxy = await hre.upgrades.deployBeaconProxy(beacon, Base, [
      "Bob",
    ]);

    await bobProxy.deployed();

    expect(await janeProxy.name()).to.equal("Base");
    expect(await janeProxy.title()).to.equal("Jane");
    expect(await bobProxy.title()).to.equal("Bob");

    // --- time passes, build out features, get funding...
    // Oh we need to write more features in our smart contract
    const BaseV2 = await hre.ethers.getContractFactory("BaseV2");

    await hre.upgrades.upgradeBeacon(beacon, BaseV2);

    const upgradedJane = BaseV2.attach(janeProxy.address);
    const upgradedBob = BaseV2.attach(bobProxy.address);

    expect(janeProxy.address).to.equal(upgradedJane.address);
    expect(bobProxy.address).to.equal(upgradedBob.address);

    expect(await upgradedJane.version()).to.equal("v2");
    expect(await upgradedBob.version()).to.equal("v2");
  });
});
