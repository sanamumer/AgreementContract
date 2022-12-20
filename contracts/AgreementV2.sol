// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";
import "./Agreement.sol";

contract AgreementContractV2 is AgreementContract,ERC2771Recipient{
    
    function _authorizeUpgrade(address) internal override onlyOwner {}

    function _msgSender() internal view override(ContextUpgradeable,ERC2771Recipient) returns(address sender) {
        return ERC2771Recipient._msgSender();
    } 
    function _msgData() internal view override(ContextUpgradeable,ERC2771Recipient)returns(bytes calldata) 
    {
        return ERC2771Recipient._msgData();
    }
    
    function NewTerms(uint256 Id,string memory _terms,string memory _date,string memory _party1)public override{
        PartyDetails[Id].Terms = _terms;
        PartyDetails[Id].Date = _date;
        PartyDetails[Id].party1 = _party1;
        PartyDetails[Id].Sign1 = true;
        emit TermsAdded(Id,_msgSender());
      }
   
    function signTerms(uint256 Id,string memory _party2) public override{
        PartyDetails[Id].party2 = _party2;
        PartyDetails[Id].Sign2 = true;
        emit party2Agreed(_party2,_msgSender(),true);
    } 
     
     function setTrustedForwarder(address _trustedForwarder)public{
        _setTrustedForwarder(_trustedForwarder);
     }
     
}