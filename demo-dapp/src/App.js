import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./App.css";
import {Biconomy} from "@biconomy/mexa";

const Web3 = require("web3");
const { config } = require("./config");
const sigUtil = require("@metamask/eth-sig-util");
const biconomyAPIKey = '4c19eb21-0634-49dd-b239-939a11812b8c'; 
const goerliProvider = 'https://goerli.infura.io/v3/999f7b04821a4e28acbe1c5ddcf43baf';

let contract;

const domainType = [     
  { name: "name", type: "string" },     
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" }
];

const metaTransactionType = [
 { name: "nonce", type: "uint256" },
 { name: "from", type: "address" },
 { name: "functionSignature", type: "bytes" }
];

let domainData = {
 name: "AgreementContractV1",
 version: "1",
 chainId: '5',
 verifyingContract: config.contract.address 
};

window.ethereum.enable().catch(error => {
  console.log(error); 
});

const web3 = new Web3(window.ethereum); 
const biconomy = new Biconomy(
   new Web3.providers.HttpProvider(goerliProvider),
   {
       apiKey: biconomyAPIKey,
       debug: true     
   }   
); 

const getWeb3 = new Web3(biconomy);  
biconomy
     .onEvent(biconomy.READY, () => {
        console.log("Mexa is Ready");
     })
     .onEvent(biconomy.ERROR, (error, message) => {
        console.error(error);
     });

const MyContract = new getWeb3.eth.Contract(contract.abi, contract.address); 
//define params here
let Id;
let Terms;
let Date;
let Name;
const metaTrx = async () => {
  let functionSignature = MyContract.methods
    .PartyDetails(Id)
    .encodeABI();
  executeMetaTransaction(functionSignature); 
};  
const addTermMeta = async() => {
  let functionSignature = MyContract.methods
  .NewTerms(Id,Terms,Date,Name)
  .encodeABI();
executeMetaTransaction(functionSignature); 
};

const executeMetaTransaction = async functionSignature => {
  const accounts = await web3.eth.getAccounts();
  let userAddress = accounts[0];
  let nonce = await MyContract.methods.getNonce(userAddress).call();
  let message = {};
  message.nonce = parseInt(nonce);
  message.from = userAddress;
  message.functionSignature = functionSignature;
  const dataToSign = JSON.stringify({
      types: {
        EIP712Domain: domainType,
        MetaTransaction: metaTransactionType
      },
      domain: domainData,
      primaryType: "MetaTransaction",
      message: message
    });
    web3.eth.currentProvider.send(
      {
        jsonrpc: "2.0",
        id: 999999999999,
        method: "eth_signTypedData_v4",
        params: [userAddress, dataToSign]
      },
      function(error, response) {
        
         let { r, s, v } = getSignatureParameters(response.result);
         
          const recovered = sigUtil.recoverTypedSignature_v4({
            data: JSON.parse(dataToSign),
            sig: response.result
          });
          let tx = MyContract.methods
          .executeMetaTransaction(userAddress, functionSignature,
           r, s, v)
          .send({
            from: userAddress
          });
      }
    );
  };
   const getSignatureParameters = signature => {
    if (!web3.utils.isHexStrict(signature)) {
      throw new Error(
        'Given value "'.concat(signature, '" is not a valid hexstring.')
      );
    }
    var r = signature.slice(0, 66);
    var s = "0x".concat(signature.slice(66, 130));
    var v = "0x".concat(signature.slice(130, 132));
    v = web3.utils.hexToNumber(v);
    if (![27, 28].includes(v)) v += 27;
    return {
      r: r,
      s: s,
      v: v
    };
  };

function App(){
  return (
    <div className='App-header'>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Contract ID</Form.Label>
        <Form.Control type="number" placeholder="Enter Id" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Terms</Form.Label>
        <Form.Control type="text" placeholder="Enter terms" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" placeholder="Enter Date" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="I Agree" />
      </Form.Group>
      <Button onClick={() => addTermMeta()}  className='Button' type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;
