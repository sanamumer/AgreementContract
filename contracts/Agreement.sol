// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/metatx/ERC2771ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol";


contract AgreementContract is Initializable, UUPSUpgradeable, OwnableUpgradeable,ERC2771ContextUpgradeable{

    function initialize() public initializer {
       __Ownable_init();
   }
   
    function _authorizeUpgrade(address) internal override onlyOwner {}

    function _msgSender() internal view override(ContextUpgradeable,ERC2771ContextUpgradeable) returns(address sender) {
        return ERC2771ContextUpgradeable._msgSender();
    } 

    function _msgData() internal view override(ContextUpgradeable,ERC2771ContextUpgradeable)returns(bytes calldata) 
    {
        return ERC2771ContextUpgradeable._msgData();
    }
     struct Agreement{  
  
      string Terms;
      string Date;

      address party1;
      bool Sign1;
      
      address party2;
      bool Sign2; 

      bool BothAgreed;
   }

    Agreement internal details;

    mapping(uint => Agreement)public PartyDetails;
    
    uint Id ;
   
      event party2Agreed(address indexed party,bool signed);
      event TermsAdded(uint Id,address indexed party1, address indexed party2);
 
    constructor(MinimalForwarderUpgradeable forwarder)ERC2771ContextUpgradeable(address(forwarder)){}  

    function NewTerms(string memory _terms,address party2) public{
        PartyDetails[Id].Terms = _terms;
        PartyDetails[Id].party1 = _msgSender();
        PartyDetails[Id].Sign1 = true;
        PartyDetails[Id].party2 = party2;
        Id += 1;
        emit TermsAdded(Id,_msgSender(), party2);
      }
   
    function signTerms() public returns(bool success){
     if(_msgSender() == PartyDetails[Id].party2){
        PartyDetails[Id].Sign2 = true;
        PartyDetails[Id].BothAgreed= true;
        emit party2Agreed(_msgSender(),true);
     }else{
      return false;
     }
    } 


    
}