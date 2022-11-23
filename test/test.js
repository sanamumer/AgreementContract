// // const { expect } = require("chai");
// const { getContractAddress } = require("@openzeppelin/hardhat-upgrades/dist/utils");
// const { ethers } = require("hardhat");
// require('solidity-coverage');

// describe("Sample contract", function(accounts){
//     it("The contract can create terms and sign by parties", async ()=>{
//      const Sample = await ethers.getContractFactory("Sample");
//      const sample = await Sample.deploy();
     
//      await sample.deployed(getContractAddress);


//     })
// })
const sample = artifacts.require("Sample");
require("@nomiclabs/hardhat-truffle5");

contract("smart contract test", function (accounts) { 

it("The contract is deployed correctly", async () => {
    const instance = await sample.deployed();
    assert.isNotNull(instance.address);
    console.log("Contract Address: ", instance.address);
  });

it("Is able to get Terms by authorized party",async () => {
  const instance = await sample.deployed();
  const tx = await instance.NewTerms("Terms","address",{ from: accounts[0]});
  assert.isNotNull(tx.receipt.transactionHash);
});

it("Is able to sign by Authorized party",async() => {
  const instance = await sample.deployed();
  const sign = await instance.signTerms();
  assert.isNotNull(sign);
});


});





