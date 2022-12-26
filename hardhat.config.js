
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

    goerli:{
      url: 'https://goerli.infura.io/v3/999f7b04821a4e28acbe1c5ddcf43baf',
      accounts:['fe3fb6a3a2322072a1319177dc2025a53fe7dde05734260f34bf3e757f7764c3']
    }
  },
  solidity: "0.8.17",
};


