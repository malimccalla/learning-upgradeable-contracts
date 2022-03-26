import { expect } from "chai";
import hre from "hardhat";

describe("Base", function () {
  it("deploys", async function () {
    const Base = await hre.ethers.getContractFactory("Base");
    const BaseV2 = await hre.ethers.getContractFactory("BaseV2");

    // Without the { kind: "uups" } we would default to using the transparent proxy pattern
    const base = await hre.upgrades.deployProxy(Base, { kind: "uups" });

    expect(await base.name()).to.equal("Base");

    await hre.upgrades.upgradeProxy(base, BaseV2);
  });
});
