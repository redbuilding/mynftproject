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

    it("should not safeMint when function status is off", async () => {
        await truffleAssert.reverts(
            mynft.safeMint(accounts[0], "7")
        )
    })

    it("should safeMint after burn is activated and used", async () => {
        await mynft.mint(1, {from: accounts[4], value: 80000000000000})
        await mynft.turnOn()
        await mynft.burn("2", {from: accounts[1]})
        await truffleAssert.passes(
        	mynft.safeMint(accounts[0], "2")
        )
    })

    it("should not safeMint when contract is paused", async () => {
        await mynft.pause()
        await truffleAssert.reverts(
            mynft.safeMint(accounts[0], "8")
        )
    })

    it("should not safeMint if tokenId exists", async () => {
        await mynft.unpause()
        await truffleAssert.reverts(
            mynft.safeMint(accounts[0], "3")
        )
    })

    it("should not safeMint when minted to the zero address", async () => {
        await truffleAssert.reverts(
            mynft.safeMint("0x0000000000000000000000000000000000000000", "8")
        )
    })

    it("should not safeMint when tokenId is zero", async () => {
        await truffleAssert.reverts(
            mynft.safeMint(accounts[0], "0")
        )
    })

    it("should not safeMint when minting exceeds allowable limit of account", async () => {
        await mynft.mint(2, {from: accounts[0]})
        await truffleAssert.reverts(
            mynft.safeMint(accounts[0], "10")
        )
    })

    it("should not safeMint when minting exceeds max supply", async () => {
        await mynft.mint(1, {from: accounts[4],value:80000000000000})
        await truffleAssert.reverts(
            mynft.safeMint(accounts[0], "11")
        )
    })

    it("should not safeMint from nonowner account", async () => {
        await mynft.burn("1")
        await truffleAssert.reverts(
            mynft.safeMint(accounts[1], "1", {from:accounts[1]})
        )
    })
    /* END TEST ROUND 1 */


})
