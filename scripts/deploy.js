
const {ethers,upgrades}= require('hardhat');

async function main() {

  const Sample = await ethers.getContractFactory("AgreementContract");
  const sample = await upgrades.deployProxy(Sample);

  await sample.deployed();

  console.log(
    `Sample contract deployed to ${sample.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});