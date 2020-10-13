import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import Box from "./Box.json";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(0);
  const [contract, setContract] = useState();
  const [accountMetamask, setAccountMetamask] = useState();
  const [balance, setBalance] = useState();

  const contractAccount = "0xE15156F76701AF0F5c4c89C41211A0b04751DF04";
  const account = "0x4112AECAc19120e8012F88699B685AAE707eBe5e";

  useEffect(() => {
    const web3Context = new Web3(Web3.givenProvider);

    console.log({ web3Context });
    const Contract = new web3Context.eth.Contract(Box.abi, contractAccount);

    setContract(Contract);

    new web3Context.eth.getAccounts((error, result) => {
      if (error) {
        console.log(error);
      } else {
        setAccountMetamask(result);
        new web3Context.eth.getBalance(
          result && result[0],
          (error, balance) => {
            setBalance(balance);
          }
        );
      }
    });

    Contract.methods.retrieve().call(function (error, result) {
      setResult(result);
    });
  }, []);

  const Submit = () => {
    contract.methods
      .store(Number(number))
      .send({
        from: accountMetamask && accountMetamask[0],
      })
      .then(() => {
        contract.methods.retrieve().call(function (error, result) {
          setResult(result);
        });
      });
  };

  return (
    <div className="App">
      <div>
        <p> Account : {accountMetamask && accountMetamask[0]}</p>
        <p> Balance : {balance} ETH</p>
      </div>
      <p>----------------------------------------------------</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          Submit();
        }}
      >
        <p>Value: {result}</p>
        <input
          type="text"
          name="addNumber"
          onChange={(event) => setNumber(event.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
