import Web3 from 'web3';
console.log('∆∆∆ Web3', Web3);

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  // Enable full provider
  window.ethereum.enable();
} else {
  console.log('else');
  // Use local websocket provider
  web3 = new Web3('ws://localhost:8545');
}

export default web3;
