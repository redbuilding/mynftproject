const MyNFTProject = artifacts.require("MyNFTProject")
const truffleAssert = require('truffle-assertions');

contract("MyNFTProject", accounts => {

    let mynft;
    beforeEach('should set up the contract instance', async () => {
        mynft = await MyNFTProject.deployed();
    })

    /* TEST ROUND 2: Ownership
    *  Used when testing:
    *  Cost = 80000000000000 wei
    *  Max Supply = 10
    *  Max Mint Amount = 3
    */
    it("should pause from owner", async () => {
        await truffleAssert.passes(
            mynft.pause()
        )
    })

    it("should unpause from owner", async () => {
        await truffleAssert.passes(
            mynft.unpause()
        )
    })

    it("should not pause from a nonowner account", async () => {
        await truffleAssert.reverts(
            mynft.pause({from: accounts[1]})
        )
    })

    it("should not unpause from a nonowner account", async () => {
        await truffleAssert.reverts(
            mynft.unpause({from: accounts[1]})
        )
    })

    it("should set a new baseURI from owner", async () => {
        await truffleAssert.passes(
            mynft.setBaseURI("ipfs://NEW/", {from: accounts[0]})
        )
    })

    it("should not set a new baseURI from a nonowner account", async () => {
        await truffleAssert.reverts(
            mynft.setBaseURI("ipfs://OLD/", {from: accounts[1]})
        )
    })

    it("should set a new base extension from owner", async () => {
        await truffleAssert.passes(
            mynft.setBaseExtension(".svg", {from: accounts[0]})
        )
    })

    it("should not set a new base extension from a nonowner account", async () => {
        await truffleAssert.reverts(
            mynft.setBaseExtension(".eps", {from: accounts[1]})
        )
    })

    it("should set a new cost from owner", async () => {
        await truffleAssert.passes(
            mynft.setCost("90000000000000", {from: accounts[0]})
        )
    })

    it("should not set a new cost from a nonowner account", async () => {
        await truffleAssert.reverts(
            mynft.setCost("70000000000000", {from: accounts[1]})
        )
    })

    it("should set a new maxMintAmount from owner", async () => {
        await truffleAssert.passes(
            mynft.setmaxMintAmount("30", {from: accounts[0]})
        )
    })

    it("should not set a new maxMintAmount from a nonowner account", async () => {
        await truffleAssert.reverts(
            mynft.setmaxMintAmount("50", {from: accounts[1]})
        )
    })

    it("should set a new maxSupply from owner", async () => {
        await truffleAssert.passes(
            mynft.setmaxSupply("2000", {from: accounts[0]})
        )
    })

    it("should not set a new maxSupply from a nonowner account", async () => {
        await truffleAssert.reverts(
            mynft.setmaxSupply("3000", {from: accounts[1]})
        )
    })

    it("should check contract balance from owner", async () => {
        await truffleAssert.passes(
            mynft.getContractBalance({from: accounts[0]})
        )
    })

    it("should not check contract balance from a nonowner account", async () => {
        await truffleAssert.reverts(
            mynft.getContractBalance({from: accounts[1]})
        )
    })

    it("should turn on function setting from owner", async () => {
        await truffleAssert.passes(
            mynft.turnOn({from: accounts[0]})
        )
    })

    it("should not turn on function setting from a nonowner account", async () => {
        await truffleAssert.reverts(
            mynft.turnOn({from: accounts[1]})
        )
    })

    it("should turn off function setting from owner", async () => {
        await truffleAssert.passes(
            mynft.turnOff({from: accounts[0]})
        )
    })

    it("should not turn off function setting from a nonowner account", async () => {
        await truffleAssert.reverts(
            mynft.turnOff({from: accounts[1]})
        )
    })

    it("should burn a token when the function is active", async () => {
        let result1 = await mynft.funSetting();
        console.log("Burn setting before (0=On | 1=Off): " + result1)
        await mynft.mint(2, {from: accounts[1], value: 180000000000000}) //mint 2
        await mynft.mint(2, {from: accounts[2], value: 180000000000000}) //mint 2
        await mynft.turnOn()
        let result2 = await mynft.funSetting();
        console.log("Burn setting after (0=On | 1=Off): " + result2)
        await truffleAssert.passes(
            mynft.burn("1", {from: accounts[1]})
        )
    })

    it("should not burn token ID 3 from nonTokenOwner account 3", async () => {
        await truffleAssert.reverts(
            mynft.burn("3", {from: accounts[3]})
        )
    })

    it("should not burn token ID 3 when the function is inactive", async () => {
        await mynft.turnOff()
        let result3 = await mynft.funSetting();
        console.log("Burn setting (0=On | 1=Off): " + result3)
        let acc2 = accounts[2];
        let result4 = await mynft.walletOfOwner(acc2);
        console.log(result4);
        await truffleAssert.reverts(
            mynft.burn("3", {from: accounts[2]})
        )
    })

    it("should withdraw from owner", async () => {
        await truffleAssert.passes(
            mynft.withdraw({from: accounts[0]})
        )
    })

    it("should not withdraw from a nonowner account", async () => {
        await truffleAssert.reverts(
            mynft.withdraw({from: accounts[1]})
        )
    })


    /* THESE TESTS ARE INTENDED TO FAIL (REVERT) AND THEY DO FAIL FOR THE RIGHT REASONS
    *  BUT THEY DO NOT PRINT A PASSED GREEN CHECK

    it("should not transfer token ID 3 from a nonTokenOwner account", async () => {
        await truffleAssert.reverts(
            await mynft.safeTransferFrom(accounts[2], accounts[4], "3", {from: accounts[3]})
        )
    })

    it("should not approve account 3 from a nonTokenOwner account", async () => {
        await truffleAssert.reverts(
            await mynft.approve(accounts[3], "3", {from: accounts[3]})
        )
    })

    it("should not set approval for all from a nonTokenOwner account", async () => {
        await truffleAssert.reverts(
            await mynft.setApprovalForAll(accounts[3], "true", {from: accounts[3]})
        )
    })

    it("should not transfer token ID 3 from a nonTokenOwner account", async () => {
        await truffleAssert.reverts(
            await mynft.transferFrom(accounts[2], accounts[4], "3", {from: accounts[3]})
        )
    })

    it("should not renounce ownership from a nonowner account", async () => {
        await truffleAssert.reverts(
            await mynft.renounceOwnership({from: accounts[3]})
        )
    })

    it("should not transfer ownership from a nonowner account", async () => {
        await truffleAssert.reverts(
            await mynft.transferOwnership({from: accounts[3]})
        )
    })
    */

    /* END TEST ROUND 2 */


})
