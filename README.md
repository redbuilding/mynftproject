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


3. Start Ganache in a terminal window.

```sh
ganache-cli
```


4. Open a new terminal window and compile the contract to run on your local blockchain.

```sh
truffle migrate --reset --network development
```


5. Start Truffle console.

```sh
truffle console
```


6. Run tests. Example:

```sh
test ./test/test.js
```

Other test files are located in the 'test' folder.


7. To test a single function, create an instance of the contract and run the function.

```sh
let instance = await MyNFTProject.deployed()
instance.name()
```



## Author

👤 **TRBG**

* Github: [@redbuilding](https://github.com/redbuilding)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
