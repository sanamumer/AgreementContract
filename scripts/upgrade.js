const {ethers,upgrades}= require('hardhat');

async function main() {
  
  const SampleV2 = await ethers.getContractFactory("AgreementContractV2");
  const samplev2 = await upgrades.upgradeProxy('0xBAbE510687C2Ff732446Cb9ba688DAff7842b345',SampleV2);

  await samplev2.deployed();

  console.log(
    `Sample contract deployed to ${samplev2.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});