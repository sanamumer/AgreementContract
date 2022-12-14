
const { DefenderRelayProvider,DefenderRelaySigner} = require('defender-relay-client/lib/ethers')
const { ethers } = require("hardhat");
const { writeFileSync } = require('fs');
const { } = require('dotenv');

async function main() {
  require('dotenv').config();
  const credentials = 
  {
    apiKey: process.env.RELAYER_API_KEY,
    apiSecret: process.env.RELAYER_API_SECRET
  }
  const provider = new DefenderRelayProvider(credentials);
  const relaySigner = new DefenderRelaySigner(credentials,provider,{
    speed:'fast',
  });

  const Forwarder = await ethers.getContractFactory('MinimalForwarderUpgradeable');
  const forwarder = await Forwarder.connect(relaySigner).deploy()

  await forwarder.deployed();

  const Agreement = await ethers.getContractFactory('AgreementContract');
  const agreement = await Agreement.connect(relaySigner).deploy(forwarder.address);

  await agreement.deployed();

  writeFileSync(
    'deploy.json',JSON.stringify({
      MinimalForwarder: forwarder.address,
      Agreement: agreement.address
    },
    null,
    2
    )
  )

  console.log(`MinimalForwarder: ${forwarder.address}\nAgreement: ${agreement.address}`);
}

// async function main() {
//   const Sample = await ethers.getContractFactory("AgreementContract");

//   const sample = await upgrades.deployProxy(Sample,{
//     initializer: "initialize",
//   });

//   await sample.deployed();

//   console.log(`contract address ${sample.address}`);

// }


if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}