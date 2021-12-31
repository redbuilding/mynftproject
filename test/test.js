const MyNFTProject = artifacts.require("MyNFTProject")
const truffleAssert = require('truffle-assertions');

contract("MyNFTProject", accounts => {

    let mynft;
    beforeEach('should set up the contract instance', async () => {
        mynft = await MyNFTProject.deployed();
    })

    /* TEST ROUND 1: Minting 
    *  Used when testing:
    *  Cost = 80000000000000 wei
    *  Max Supply = 10
    *  Max Mint Amount = 3
    */
    it("should mint one token from owner", async () => {
        await truffleAssert.passes(
            mynft.mint(1, {from: accounts[0]})
        )
    })

    it("should mint one token from a nonowner account", async () => {
        await truffleAssert.passes(
            mynft.mint(1, {from: accounts[1], value: 80000000000000})
        )
    })

    it("should not mint when a zero token amount is entered", async () => {
        await truffleAssert.reverts(
            mynft.mint(0, {from: accounts[0]})
        )
    })

    it("should not mint when the cost has not been entered", async () => {
        await truffleAssert.reverts(
            mynft.mint(0, {from: accounts[1]})
        )
    })

    it("should not mint when the value to be sent is less than the cost", async () => {
        await truffleAssert.reverts(
            mynft.mint(0, {from: accounts[1], value: 100})
        )
    })

    it("should mint the maximum allowable mints at one time", async () => {
        await truffleAssert.passes(
            mynft.mint(3, {from: accounts[2], value: 240000000000000})
        )
    })

    it("should not mint more than the maximum allowable mints at one time", async () => {
        await truffleAssert.reverts(
            mynft.mint(4, {from: accounts[1], value: 320000000000000})
        )
    })

    it("should not mint when contract is paused", async () => {
        await mynft.pause()
        await truffleAssert.reverts(
            mynft.mint(1, {from: accounts[3], value: 80000000000000})
        )
    })

    it("should mint when contract is unpaused", async () => {
        await mynft.unpause()
        await truffleAssert.passes(
            mynft.mint(1, {from: accounts[3], value: 80000000000000})
        )
    })
    /* END TEST ROUND 1 */


})
