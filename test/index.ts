import { expect } from "chai";
import hre from "hardhat";

describe("Base", function () {
  it("deploys", async function () {

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
    const baseV2 = await hre.upgrades.upgradeProxy(janeProxy, BaseV2);

    expect(await baseV2.version()).to.equal("v2");
    expect(await baseV2.version()).to.equal("v2");
    // -- time passes again

    const BaseV3 = await hre.ethers.getContractFactory("BaseV3");
    const baseV3 = await hre.upgrades.upgradeProxy(janeProxy, BaseV3);

    expect(await baseV3.version()).to.equal("v3");
  });
});
