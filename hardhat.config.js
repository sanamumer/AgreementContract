require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-truffle5");

require("dotenv").config();

module.exports = {
 solidity: "0.8.17",
 networks: {
   goerli: {
     url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
     accounts: [process.env.PRIVATE_KEY],
   },
   ganache: {
    url : 'https://localhost:8545'
   }
 },

};


