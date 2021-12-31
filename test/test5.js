const MyNFTProject = artifacts.require("MyNFTProject")
const truffleAssert = require('truffle-assertions');

contract("MyNFTProject", accounts => {

    let mynft;
    beforeEach('should set up the contract instance', async () => {
        mynft = await MyNFTProject.deployed();
    })

    /* TEST ROUND 5: Balances
    *  Used when testing:
    *  Cost = 800000000000000000 wei
    *  Max Supply = 10
    *  Max Mint Amount = 3
    */
    it("should return the balance of the contract", async () => {
        let balance1 = await mynft.getContractBalance();
        let result1 = await web3.utils.fromWei(balance1, 'ether');
        console.log("Before minting: " + result1);
        await mynft.mint(3, {from: accounts[1], value: 2400000000000000000}) //mint 3
        await mynft.mint(3, {from: accounts[2], value: 2400000000000000000}) //mint 3
        await mynft.mint(1, {from: accounts[3], value: 800000000000000000}) //mint 1 -> maxSupply reached
        let balance2 = await mynft.getContractBalance();
        let result2 = await web3.utils.fromWei(balance2, 'ether');
        console.log("After minting: " + result2);
    })

    it("should withdraw the balance of the contract to owner", async () => {
        let result3 = await web3.eth.getBalance(accounts[0]);
        let ethresult3 = await web3.utils.fromWei(result3, 'ether');
        console.log("Owner before: " + ethresult3)
        let balance3 = await mynft.getContractBalance();
        let result4 = await web3.utils.fromWei(balance3, 'ether');
        console.log("Contract before: " + result4);
        await mynft.withdraw();
        let balance4 = await mynft.getContractBalance();
        let result5 = await web3.utils.fromWei(balance4, 'ether');
        console.log("Contract after: " + result5);
        let result6 = await web3.eth.getBalance(accounts[0]);
        let ethresult6 = await web3.utils.fromWei(result6, 'ether');
        console.log("Owner after: " + ethresult6)
    })

    it("should return the token balance of a collector", async () => {
        await mynft.mint(3, {from: accounts[0]}) //mint 3
        let acc1 = accounts[0];
        let result = await mynft.walletOfOwner(acc1);
        console.log(result);
    })
    /* END TEST ROUND 5 */

})
