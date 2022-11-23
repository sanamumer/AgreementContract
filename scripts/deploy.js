
const { ethers, upgrades } = require("hardhat");

async function main() {
  const Sample = await ethers.getContractFactory("Sample");

  const sample = await upgrades.deployProxy(Sample,{
    initializer: "initialize",
  });

  await sample.deployed();

  console.log(`contract address ${sample.address}`);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
