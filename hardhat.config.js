
require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  defaultNetwork: 'ganache',
  networks: {

    ganache: {
      url: 'http://localhost:8545'
    },

   
  solidity: "0.8.17",
};


