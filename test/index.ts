import { expect } from "chai";
import hre from "hardhat";

describe("Base", function () {
  it("deploys", async function () {
    const Base = await hre.ethers.getContractFactory("Base");
    const BaseV2 = await hre.ethers.getContractFactory("BaseV2");
    const BaseV3 = await hre.ethers.getContractFactory("BaseV3");

    // Without the { kind: "uups" } we would default to using the transparent proxy pattern
    const base = await hre.upgrades.deployProxy(Base, { kind: "uups" });

    expect(await base.name()).to.equal("Base");

    // --- time passes, build out features, get funding...
    // Oh we need to write more features in our smart contract

    // So we call upgradeProxy
    const baseV2 = await hre.upgrades.upgradeProxy(base, BaseV2);

    // -- time passes again
    expect(await baseV2.version()).to.equal("v2");

    const baseV3 = await hre.upgrades.upgradeProxy(base, BaseV3);

    expect(await baseV3.version()).to.equal("v3");
  });
});
