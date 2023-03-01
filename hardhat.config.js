require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
    ],
  },
  networks: {
    "optimism-goerli": {
      url: process.env.ALCHEMY_OP_GOERLI_KEY_HTTP,
      accounts: [process.env.ALCHEMY_OP_GOERLI_PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: {
      optimisticGoerli: process.env.ETHERSCAN_OP_API_KEY,
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: false,
    only: [],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    gasPriceApi: process.env.GAS_PRICE_API,
    showTimeSpent: true,
  },
};
