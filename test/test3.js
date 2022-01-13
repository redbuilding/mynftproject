const MyNFTProject = artifacts.require("MyNFTProject")
const truffleAssert = require('truffle-assertions');

contract("MyNFTProject", accounts => {

    let mynft;
    beforeEach('should set up the contract instance', async () => {
        mynft = await MyNFTProject.deployed();
    })

    /* TEST ROUND 3: Supply
    *  Used when testing:
    *  Cost = 80000000000000 wei
    *  Max Supply = 10
    *  Max Mint Amount = 3
    */
    it("should be able to mint more after maxSupply is updated", async () => {
        await mynft.mint(3, {from: accounts[7], value: 240000000000000}) //mint 3
        await mynft.mint(3, {from: accounts[1], value: 240000000000000}) //mint 3
        await mynft.mint(3, {from: accounts[2], value: 240000000000000}) //mint 3
        await mynft.mint(1, {from: accounts[3], value: 80000000000000}) //mint 1 -> maxSupply reached
        await mynft.setmaxSupply(11, {from: accounts[0]}) //owner increases supply
        await truffleAssert.passes( //test if able to mint 1 more
            mynft.mint(1, {from: accounts[4], value: 80000000000000})
        )
    })

    it("should not be able to mint more after maxSupply is reached", async () => {
        await truffleAssert.reverts( //test if able to mint 1 more
            mynft.mint(1, {from: accounts[4], value: 80000000000000})
        )
    })

    it("should mint after tokens are burned then safeMint restores tokenID order", async () => {
        await mynft.setmaxSupply(15)
        await mynft.turnOn()
        await mynft.burn("10", {from:accounts[3]})
        await mynft.burn("7", {from:accounts[2]})
        await mynft.safeMint(accounts[6], "10")
        await mynft.safeMint(accounts[5], "7")
        await truffleAssert.passes(
        	await mynft.mint(1, {from: accounts[4], value: 80000000000000})
        )
    })

    /* END TEST ROUND 3 */

})
