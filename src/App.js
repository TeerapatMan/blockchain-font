import React, { useState, useEffect } from 'react'
import './App.css'
import Web3 from 'web3'
import Box from './Box.json'
import SLEEPToken from './SLEEPToken.json'

import { hot } from 'react-hot-loader/root'
import 'react-hot-loader'

function App() {
  const [number, setNumber] = useState('')
  const [result, setResult] = useState(0)
  const [contract, setContract] = useState()
  const [accountMetamask, setAccountMetamask] = useState()
  const [balance, setBalance] = useState()
  const [accountTo, setAccountTo] = useState()
  const [value, setValue] = useState()
  const [balanceCoin, setBalanceCoin] = useState()
  const [sleepCoin, setSleepCoin] = useState()
  const [totalSupply, setTotalSupply] = useState()

  const contractAccount = '0x6102F01A1A46778Da6c9b1E4846766fB477d6e15'

  const sleepAccount = '0xF484d2E4B1AfAa7a61C328CBC2e44E408b88e8Aa'

  const web3Context = new Web3(Web3.givenProvider)

  const Contract = new web3Context.eth.Contract(Box.abi, contractAccount)

  const SLEEP = new web3Context.eth.Contract(SLEEPToken.abi, sleepAccount)

  web3Context.eth.getAccounts((error, res) => {
    if (res[0] !== accountMetamask) {
      setAccountMetamask(res[0])
    }
  })

  window.ethereum.on('accountsChanged', async function (accounts) {
    setAccountMetamask(accounts[0])
  })

  useEffect(() => {
    if (accountMetamask) {
      web3Context.eth.getBalance(accountMetamask, (error, balance) => {
        setBalance(balance)
      })

      SLEEP.methods.balanceOf(accountMetamask).call((err, res) => {
        setBalanceCoin(res)
      })

      SLEEP.methods.totalSupply().call((err, res) => {
        setTotalSupply(res)
      })

      Contract.methods.retrieve().call(function (error, result) {
        setResult(result)
      })

      setSleepCoin(SLEEP)

      setContract(Contract)
    }
  }, [accountMetamask])

  const Submit = () => {
    contract.methods
      .store(Number(number))
      .send({
        from: accountMetamask,
      })
      .then(() => {
        contract.methods.retrieve().call(function (error, result) {
          setResult(result)
        })
      })
  }

  const TransferMatemark = () => {
    const web3Context = new Web3(Web3.givenProvider)
    web3Context.eth.sendTransaction({
      from: accountMetamask,
      to: accountTo,
      value: value,
    })
  }

  const Transfer = () => {
    sleepCoin.methods.transfer(accountTo, value.toString()).send({
      from: accountMetamask,
    })
  }

  return (
    <div className="App">
      <div>
        <p> Account : {accountMetamask}</p>
        <p> Balance : {balance} ETH</p>
      </div>
      <p>--------------Transfer Metamask--------------</p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          TransferMatemark()
        }}
      >
        <div style={{ display: 'inline' }}>
          <div
            style={{
              display: 'flex',
              whiteSpace: 'nowrap',
              alignItems: 'center',
            }}
          >
            to :
            <input
              type="text"
              name="to"
              onChange={(event) => setAccountTo(event.target.value)}
              style={{ width: '100%', marginLeft: '10%' }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              whiteSpace: 'nowrap',
              alignItems: 'center',
            }}
          >
            value :
            <input
              type="text"
              name="value"
              onChange={(event) => setValue(event.target.value)}
              style={{ width: '100%', marginLeft: 21 }}
            />
          </div>
          <input type="submit" />
        </div>
      </form>
      <p>----------------------------------------</p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          Submit()
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
      <p>--------------------Transfer Coin Metamask--------------------</p>
      <div>
        <p>Total Supply SLEEP Coin : {totalSupply} GN</p>
        <p> Balance : {balanceCoin} GN</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          Transfer()
        }}
      >
        <div style={{ display: 'inline' }}>
          <div
            style={{
              display: 'flex',
              whiteSpace: 'nowrap',
              alignItems: 'center',
            }}
          >
            to :
            <input
              type="text"
              name="to"
              onChange={(event) => setAccountTo(event.target.value)}
              style={{ width: '100%', marginLeft: '10%' }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              whiteSpace: 'nowrap',
              alignItems: 'center',
            }}
          >
            value :
            <input
              type="text"
              name="value"
              onChange={(event) => setValue(event.target.value)}
              style={{ width: '100%', marginLeft: 21 }}
            />
          </div>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default hot(App)
