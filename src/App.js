import React, { Component } from 'react';
import logo from './logo.svg';
import Web3 from 'web3';
import Contract from 'truffle-contract';
import simpleContractJson from './contracts/SimpleContract.json';
import AccountStatus from './AccountStatus';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.web3 = '';

    this.state = {
      activeAccount: '',
      userRejectedWeb3: false,
      inputValue: '',
      text: '',
    };
  }

  componentDidMount() {
    this.connectToWeb3();
    this.getContractText();
    // this.watchEvents();
  }

  connectToWeb3() {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);

      // Enable full provider
      window.ethereum.send('eth_requestAccounts')
        .then(accounts => {
          console.log('Approved accounts:', accounts)
          this.setState({ activeAccount: accounts[0], userRejectedWeb3: false })
        })
        .catch(error => {
          if (error.code === 4001) {
            console.log('User denied connecting an account!');
            this.setState({ userRejectedWeb3: true })
          }
        });

      window.ethereum.on('accountsChanged', accounts => {
        if (accounts.length) {
          this.setState({ activeAccount: accounts[0], userRejectedWeb3: false });
        } else {
          this.setState({ activeAccount: '', userRejectedWeb3: true });
        }
      })
    } else {
      // Use local websocket provider
      this.web3 = new Web3('ws://localhost:8545');
    }
  }

  async watchEvents() {
    const contract = await this.getContractInstance();
    const event = contract.Update();
    event.watch((error, result) => {
      if (error) {
        return console.log(`Event error: ${error}`);
      }

      this.setState({ text: result.args.text });
    })
  }

  async getContractInstance() {
    const contract = Contract(simpleContractJson);
    contract.setProvider(this.web3.currentProvider);

    // Hack for web3@1.0.0 support for localhost testrpc
    // https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
    if (typeof contract.currentProvider.sendAsync !== 'function') {
      contract.currentProvider.sendAsync = function() {
        return contract.currentProvider.send.apply(contract.currentProvider, arguments);
      };
    }

    const accounts = await this.web3.eth.getAccounts();
    contract.defaults({ from: accounts[0]  });

    return await contract.deployed();
  }

  async getContractText() {
    const contract = await this.getContractInstance();
    const text = await contract.text();
    this.setState({ text });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const contract = await this.getContractInstance();
    await contract.updateText(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">dapp-starter</h1>
        </header>

        <AccountStatus
          activeAccount={this.state.activeAccount}
          userRejectedWeb3={this.state.userRejectedWeb3}
        />

        <div className="App-intro">
          The value on the blockchain is:<br/>
          <div className="contract-text">{this.state.text}</div>
        </div>

        <form onSubmit={this.handleSubmit}>
          <input
            className="form-input"
            value={this.state.inputValue}
            onChange={e => this.setState({ inputValue: e.target.value })}
          />
          <button className="form-btn" type="submit" disabled={!this.state.inputValue}>
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default App;
