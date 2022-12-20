
connectToMetaMask = async() =>{
    let address = await ethereum.request({method: 'eth_requestAccounts'});
    console.log('connected to metamask',address);
}

window.onload = async () => {
    
    let contractAddress = '0x4436b33d8364bddeA73490F6a8a31da70Ec32a72';
    let abi =  [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "previousAdmin",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "newAdmin",
            "type": "address"
          }
        ],
        "name": "AdminChanged",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "beacon",
            "type": "address"
          }
        ],
        "name": "BeaconUpgraded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint8",
            "name": "version",
            "type": "uint8"
          }
        ],
        "name": "Initialized",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "Id",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "party1",
            "type": "address"
          }
        ],
        "name": "TermsAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "implementation",
            "type": "address"
          }
        ],
        "name": "Upgraded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "party2",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "signed",
            "type": "bool"
          }
        ],
        "name": "party2Agreed",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "Id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_terms",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_date",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_party1",
            "type": "string"
          }
        ],
        "name": "NewTerms",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "PartyDetails",
        "outputs": [
          {
            "internalType": "string",
            "name": "Terms",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "Date",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "party1",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "Sign1",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "party2",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "Sign2",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "proxiableUUID",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "Id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_party2",
            "type": "string"
          }
        ],
        "name": "signTerms",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newImplementation",
            "type": "address"
          }
        ],
        "name": "upgradeTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newImplementation",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "name": "upgradeToAndCall",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }
    ]
    const biconomy = new Biconomy(window.ethereum,{apiKey: "RYkAgU2dz.b700ee7a-535e-4019-aa93-4c13c4d27031"});
    web3 = new Web3(biconomy);
    MyContract = new web3.eth.Contract(abi,contractAddress);
   
}

createContract = async() =>{
    let contractID = document.getElementById("contractID").value;
    let name = document.getElementById("name").value;
    let terms = document.getElementById("terms").value;
    let date = document.getElementById("date").value;
    console.log(contractID,name,terms,date);
     let trx = await MyContract.methods.NewTerms(contractID,name,terms,date).send({
      from: address,
      signatureType: "EIP712_SIGN",
    });
   
    console.log(trx);
}

SubmitContract = async()=>{
    let contractID = document.getElementById("contractID").value;
    let Name = document.getElementById('Name').value;
   
    console.log(contractID,Name);

    let trx = await MyContract.methods.signTerms(contractID,Name).send({
      from: address,
      signatureType: "EIP712_SIGN",
    });
    console.log(trx);
  
}






