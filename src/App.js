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
  const [accountFrom, setAccountFrom] = useState()
  const [accountTo, setAccountTo] = useState()
  const [value, setValue] = useState()
  const [balanceCoin, setBalanceCoin] = useState()
  const [sleepCoin, setSleepCoin] = useState()

  const contractAccount = '0xe309E0911dd2301e962F77364D2E128Efe92bF86'

  const myToken = '0x4489B13424Ca5C6B14888f0212BB5431C1bB6Ec7'

  const sleepAccount = '0x0c603D4A0ddeD581a47907347939be371495925D'

  useEffect(() => {
    const web3Context = new Web3(Web3.givenProvider)

    new web3Context.eth.getAccounts((error, result) => {
      if (error) {
        console.log(error)
      } else {
        setAccountMetamask(result)
        const SLEEP = new web3Context.eth.Contract(SLEEPToken.abi, myToken)
        new web3Context.eth.getBalance(
          result && result[0],
          (error, balance) => {
            setBalance(balance)
          },
        )
        getBalance(result, SLEEP)
        setSleepCoin(SLEEP)
      }
    })

    console.log({ web3Context })

    const Contract = new web3Context.eth.Contract(Box.abi, contractAccount)

    Contract.methods.retrieve().call(function (error, result) {
      setResult(result)
    })

    setContract(Contract)
  }, [])

  const getBalance = (result, SLEEP) => {
    const balance = SLEEP?.methods.balanceOf(sleepAccount)
    balance.call(function (error, result) {
      setBalanceCoin(result)
    })
  }

  const Submit = () => {
    contract.methods
      .store(Number(number))
      .send({
        from: accountMetamask && accountMetamask[0],
      })
      .then(() => {
        contract.methods.retrieve().call(function (error, result) {
          setResult(result)
        })
      })
  }

  const Transfer = () => {
    console.log({ sleepCoin })
    sleepCoin.methods
      .transfer(accountMetamask && accountMetamask[0], value)
      .send({
        from: sleepAccount,
      })
  }

  return (
    <div className="App">
      <div>
        <p> Account : {accountMetamask && accountMetamask[0]}</p>
        <p> Balance : {balance} ETH</p>
      </div>
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
      <p>----------------------------------------</p>
      <div>
        <p> Balance SLEEP Coin : {balanceCoin} GN</p>
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
            from :
            <input
              type="text"
              name="from"
              value={accountMetamask && accountMetamask[0]}
              onChange={(event) => setAccountFrom(event.target.value)}
              style={{ width: '100%', marginLeft: 26 }}
            />
          </div>
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
