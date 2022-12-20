// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract AgreementContract is Initializable, UUPSUpgradeable, OwnableUpgradeable{

    function initialize() public initializer {
       __Ownable_init();
   }
   
    function _authorizeUpgrade(address) internal override virtual onlyOwner {}

     struct Agreement{  
    
      string Terms;
      string Date;
      string party1;
      bool Sign1;
       
      string party2;
      bool Sign2; 
   }

    mapping(uint256 => Agreement)public PartyDetails;
    
      event TermsAdded(uint Id,address indexed party1);
      event party2Agreed(string name,address indexed party2,bool signed);
   
    // constructor(_trustedForwarder)ERC2771ContextUpgradeable(address(_trustedForwarder)){}  
   
    function NewTerms(uint256 Id,string memory _terms,string memory _date,string memory _party1)public virtual{
        PartyDetails[Id].Terms = _terms;
        PartyDetails[Id].Date = _date;
        PartyDetails[Id].party1 = _party1;
        PartyDetails[Id].Sign1 = true;
        emit TermsAdded(Id,msg.sender);
      }
   
    function signTerms(uint256 Id,string memory _party2) public virtual{
        PartyDetails[Id].party2 = _party2;
        PartyDetails[Id].Sign2 = true;
        emit party2Agreed(_party2,msg.sender,true);
    } 
  
}