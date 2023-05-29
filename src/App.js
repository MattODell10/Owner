import React, { useState } from "react";
import { Owner } from "./abi/abi";
import Web3 from "web3";
import './App.css';

// Access our wallet inside of our dapp
const web3 = new Web3(Web3.givenProvider);
// Contract address of the deployed smart contract
const contractAddress = "0xB336c68c7F1d23844e889F3B65c62C4c4b046e0b";
const storageContract = new web3.eth.Contract(Owner, contractAddress);

function App() {
  // Hold variables that will interact with our contract and frontend
  const [number, setUint] = useState(0);
  const [getNumber, setGet] = useState("0");
  
  const numberSet = async (t) => {
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    // Get permission to access user funds to pay for gas fees
    const gas = await storageContract.methods.changeOwner(number).estimateGas();
    const post = await storageContract.methods.changeOwner(number).send({
      from: account,
      gas,
    });
  };

  const numberGet = async (t) => {
    t.preventDefault();
    const post = await storageContract.methods.getOwner().call();
    setGet(post);
  };
  
  return (
     <div className="main">
       <div className="card">
         <form className="form" onSubmit={numberSet}>
           <label>
             Change Owner:
             <input
               className="input"
               type="text"
               name="name"
               onChange={(t) => setUint(t.target.value)}
             />
           </label>
           <button className="button" type="submit" value="Confirm">
             Confirm
           </button>
         </form>
         <br />
         <button className="button" onClick={numberGet} type="button">
           Get Owner's Address:
         </button>
         {getNumber}
       </div>
     </div>
  );
}

export default App;