## dapp-starter (WIP)

An example Ethereum dApp highlighting the breaking changes coming with EIP 1102. More details coming soon.

#### Some steps taken to get here:
- Bring truffle up to date:
  - `$ npm update -g truffle`
- Initialize the project directory:
  - `$ mkdir dapp-starter && cd dapp-starter`
- Initialize a new truffle project (Note: dir must be empty):
  - `$ truffle init`
- Configure `truffle.js` for development. Include a custom build directory for compatability with `create-react-app`.
- Implement a basic solidity contract in `SimpleContract.sol`.
- Add the contract migration file: `2_deploy_contract.js`.
- Generate the React application:
  - `$ create-react-app dapp-starter`
- Relocate the nested files to the root dir:
  - `$ mv dapp-starter/* . && rm -rf dapp-starter`
- Add web3 connection file: `src/web3.js`.
- Install `truffle-contract`:
  - `$ npm i -S truffle-contract`
- Handle quirks in #getContractInstance.
- Implement basic contract reads and writes.
- Watch for contract events and update state.

---

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You will find some information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
