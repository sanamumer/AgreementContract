const {ethers,upgrades}= require('hardhat');

async function main() {
  
  const SampleV2 = await ethers.getContractFactory("AgreementContractV2");
  const samplev2 = await upgrades.upgradeProxy('0x327B5Cc65f23494eCD1774B3Fb7C9d1Ab90cb1fd',SampleV2);

  await samplev2.deployed();

  console.log(
    `Sample contract deployed to ${samplev2.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});