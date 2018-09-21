const path = require('path');

module.exports = {
  contracts_build_directory: path.join(__dirname, './src/contracts'),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 6700000,
    },
    rinkeby: {
      host: '127.0.0.1',
      port: 7545, // Unique port for safety
      network_id: '4',
      gas: 6700000,
    },
  }
};
