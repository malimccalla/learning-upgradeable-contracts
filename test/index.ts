import { expect } from "chai";
import { ethers } from "hardhat";

describe("Base", function () {
  it("deploys", async function () {
    const Base = await ethers.getContractFactory("Base");
    const base = await Base.deploy();
    await base.deployed();

    expect(await base.name()).to.equal("Base");
  });
});
