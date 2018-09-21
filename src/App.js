import React, { Component } from 'react';
import logo from './logo.svg';
import web3 from './web3';
import './App.css';
import Contract from 'truffle-contract';
import simpleContractJson from './contracts/SimpleContract.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      text: ''
    };
  }

  componentDidMount() {
    this.getContractText();
    this.watchEvents();
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
    contract.setProvider(web3.currentProvider);

    // Hack for web3@1.0.0 support for localhost testrpc
    // https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
    if (typeof contract.currentProvider.sendAsync !== 'function') {
      contract.currentProvider.sendAsync = function() {
        return contract.currentProvider.send.apply(contract.currentProvider, arguments);
      };
    }

    const accounts = await web3.eth.getAccounts();
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
