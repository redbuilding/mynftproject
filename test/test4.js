const MyNFTProject = artifacts.require("MyNFTProject")
const truffleAssert = require('truffle-assertions');

contract("MyNFTProject", accounts => {

    let mynft;
    beforeEach('should set up the contract instance', async () => {
        mynft = await MyNFTProject.deployed();
    })

    /* TEST ROUND 4: State variables
    *  Used when testing:
    *  Cost = 80000000000000 wei
    *  Max Supply = 10
    *  Max Mint Amount = 3
    */
    it("should return the URI of a tokenID", async () => {
        await mynft.mint(3, {from: accounts[1], value: 240000000000000}) //mint 3
        let tokID = 3;
        let result = await mynft.tokenURI(tokID);
        console.log(result);
    })

    it("should set a new cost and print the result", async () => {
        await mynft.cost().then(result => console.log("Current: " + BigInt(result)))
        await mynft.setCost("90000000000000")
        await mynft.cost().then(result => console.log("Updated: " + BigInt(result)))
    })

    it("should set a new max mint amount and print the result", async () => {
        await mynft.maxMintAmount().then(result => console.log("Current: " + BigInt(result)))
        await mynft.setmaxMintAmount("7")
        await mynft.maxMintAmount().then(result => console.log("Updated: " + BigInt(result)))
    })

    it("should set a new max supply and print the result", async () => {
        await mynft.maxSupply().then(result => console.log("Current: " + BigInt(result)))
        await mynft.setmaxSupply("10000")
        await mynft.maxSupply().then(result => console.log("Updated: " + BigInt(result)))
    })

    it("should set a new base extension and print the result", async () => {
        await mynft.baseExtension().then(result => console.log("Current: " + result))
        await mynft.setBaseExtension(".svg")
        await mynft.baseExtension().then(result => console.log("Updated: " + result))
    })
    /* END TEST ROUND 4 */

})
