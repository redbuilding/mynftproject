<h1 align="center">Welcome to MyNFTProject 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> An ERC-721 smart contract template for creating non-fungible tokens (NFTs) with limited supply and storage off-chain.

## Install

1. Go to the project directory.

```sh
cd /projectdirectory
```


2. Install the project.

```sh
npm install
```


3. Install babel-register.

```sh
npm install babel-register
```


## Deploy on a local blockchain

1. Start Ganache in a terminal window.

```sh
ganache-cli
```


2. Open a new terminal window and compile the contract to run on your local blockchain.

```sh
truffle migrate --reset --network development
```


3. Start Truffle console.

```sh
truffle console
```


4. Run tests. Example:

```sh
test ./test/test.js
```

Other test files are located in the 'test' folder.


5. To test a single function, create an instance of the contract and run the function.

```sh
let instance = await MyNFTProject.deployed()
instance.name()
```

Note: JS test files are designed to run individually, rather than all at once. Each file is focused on a specific area:

* test.js - minting
* test2.js - ownership
* test3.js - supply
* test4.js - state variables
* test5.js - balances
* test_oz.js - functions and events from OpenZeppelin standard contracts



## Deploy on the testnet Rinkeby

1. To connect to the Ethereum network using a testnet like Rinkeby, you'll need an API from a provider like Infura.io. Enter the API key in the ENV file where noted.

2. When using this smart contract for artwork, you'll need a storage solution like that offered on IPFS (example: Pinata.cloud), to store your image files and your image metadata files. Enter your metadata CID in the ENV file where noted.

3. The owner of the contract will also need a wallet with test ETH. Use a faucet like that offered by Chainlink to receive test ETH:  https://faucets.chain.link/

4. Enter the private key of the contract owner's wallet in the ENV file where noted.

5. Change the ENV filename to:  .env

⚠️ **Important**:  Do NOT share private key information. Do NOT upload your .env file to Github with private key information.

6. Update the project name and symbol in the file:  contracts/MyNFTProject.sol

7. If you have changed the contract name, update the contract name in the file:  migrations/2_mynftproject.js

8. Deploy to Rinkeby.

```sh
truffle migrate --reset --network rinkeby
```

9. To deploy to another testnet, you'll have to update the truffle-config.js file with the appropriate testnet information.


## Security

To report a bug or security-related issue, please contact security@redbuildinggroup.com.


## Thank you

Special thanks to the following organizations and companies for providing the knowledge to create this project, and for empowering industry advancements:

* OpenZeppelin - https://openzeppelin.com/
* Moralis Academy - https://academy.moralis.io/
* DAPP University - https://www.dappuniversity.com/
* Hashlips - https://hashlips.online/HashLips


## Author

👤 **TRBG**

* Github: [@redbuilding](https://github.com/redbuilding)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
