require('babel-register');
require('@babel/polyfill');
require("dotenv").config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {

    networks: {

        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
        },

        rinkeby: {
			provider: function () {
				return new HDWalletProvider(
					[process.env.DEPLOYER_PRIVATE_KEY],
					`wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
				)
			},
			network_id: 4
		},

    },

    contracts_directory: './contracts/',

    contracts_build_directory: './build/contracts/',

    compilers: {
        solc: {
            version: "0.8.9",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
            },
            }
        }
    },

};
