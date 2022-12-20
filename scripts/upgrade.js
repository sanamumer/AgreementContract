const {ethers,upgrades}= require('hardhat');

async function main() {
  
  const SampleV2 = await ethers.getContractFactory("AgreementContractV2");
  const samplev2 = await upgrades.upgradeProxy('0x4436b33d8364bddeA73490F6a8a31da70Ec32a72',SampleV2);

  await samplev2.deployed();

  console.log(
    `Sample contract deployed to ${samplev2.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});