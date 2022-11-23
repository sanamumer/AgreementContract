// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract Sample is Initializable, UUPSUpgradeable, OwnableUpgradeable{

      function initialize() public initializer {
       __Ownable_init();
   }


   function _authorizeUpgrade(address) internal override onlyOwner {}

     struct Agreement{  
  
      string Terms;
      string Date;

      address party1;
      bool Sign1;
      
      address party2;
      bool Sign2; 
   }

    Agreement internal details;

    mapping(uint => Agreement)public PartyDetails;
    uint Id ;
    bool BothAgreed;

      event partyAgreed(address indexed party);
      event Agreed(address indexed party1, address indexed party2);
 
   
    modifier onlyParty(){
       require(msg.sender == details.party1 || msg.sender == details.party2);
       _;
   }
   function NewTerms(string memory _terms,address party2) public{
        PartyDetails[Id].Terms = _terms;
        PartyDetails[Id].party1 = msg.sender;
        PartyDetails[Id].Sign1 = true;
        PartyDetails[Id].party2 = party2;
        Id += 1;
 }
   
 function signTerms() public returns(bool){
     if(msg.sender == PartyDetails[Id].party2){
        PartyDetails[Id].Sign2 = true;
        emit partyAgreed(msg.sender);
     }else{
      return false;
     }
    return BothAgreed= true;
    }    
    
}