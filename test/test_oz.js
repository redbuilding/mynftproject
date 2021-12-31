const MyNFTProject = artifacts.require("MyNFTProject")
const truffleAssert = require('truffle-assertions');

contract("MyNFTProject", accounts => {

    let mynft;
    beforeEach('should set up the contract instance', async () => {
        mynft = await MyNFTProject.deployed();
    })


    /* TEST ROUND 6: Openzeppelin functions & events
    *  When using this test, include this flag to show events: --show-events
    *  Used when testing: 
    *  Cost = 80000000000000 wei
    *  Max Supply = 10
    *  Max Mint Amount = 3
    */
    it("should mint one token from owner", async () => {
        await mynft.mint(1, {from: accounts[0]});
    })

    it("should mint two tokens from a nonowner account", async () => {
        await truffleAssert.passes(
            mynft.mint(2, {from: accounts[1], value: 160000000000000})
        )
    })

    it("should transfer one token with ID of 4 from account 2 to account 3", async () => {
        await mynft.mint(1, {from: accounts[2], value: 80000000000000})
        await truffleAssert.passes(
            mynft.safeTransferFrom(accounts[2], accounts[3], "4", {from: accounts[2]})
        )
    })

    it("should mint and print balance of account 3, owner of token ID 5, and token ID 5 URI", async () => {
        await mynft.mint(3, {from: accounts[3], value: 240000000000000})
        await mynft.balanceOf(accounts[3]).then(result1 => console.log("Balance: " + BigInt(result1)))
        await mynft.ownerOf("5").then(result2 => console.log("Owner: " + result2))
        await mynft.tokenURI("5").then(result3 => console.log("URI: " + result3))
    })

    it("should approve account 2 and print the approved token ID 7", async () => {
        await mynft.approve(accounts[2], "7", {from: accounts[3]})
        await mynft.getApproved("7").then(result4 => console.log("Approved: " + result4))
    })

    it("should transfer token ID 8 from approved account 2 to account 4 and print approval and ownership", async () => {
        await mynft.mint(1, {from: accounts[5], value: 80000000000000})
        await mynft.approve(accounts[2], "8", {from: accounts[5]})
        await mynft.getApproved("8").then(result5 => console.log("Approved before: " + result5))
        await mynft.ownerOf("8").then(result6 => console.log("Owner before: " + result6))
        await mynft.safeTransferFrom(accounts[5], accounts[4], "8", {from: accounts[2]})
        await mynft.getApproved("8").then(result7 => console.log("Approved after: " + result7))
        await mynft.ownerOf("8").then(result8 => console.log("Owner after: " + result8))
    })

    it("should show all of account 3 as approved by account 7 and print whether owner & operator are approved", async () => {
        await mynft.setApprovalForAll(accounts[7], "true", {from: accounts[3]})
        await mynft.isApprovedForAll(accounts[3], accounts[7], {from: accounts[3]}).then(
            result9 => console.log("True = Approved | False = Not Approved: " + result9))
    })

    //use of transferFrom discouraged
    it("should use transferFrom function to move a token from account 1 to account 2", async () => {
        await truffleAssert.passes(
            mynft.transferFrom(accounts[1], accounts[2], "2", {from: accounts[1]})
        )
    })

    it("should show token ID 1 owned by account 0", async () => {
        await mynft.tokenOfOwnerByIndex(accounts[0], "0", {from: accounts[0]}).then(
                result10 => console.log(BigInt(result10)))
    })

    it("should show total supply", async () => {
        await mynft.totalSupply().then(result11 => console.log(BigInt(result11)))
    })

    it("should show token ID 1 owned by account 0", async () => {
        await mynft.tokenByIndex("0").then(result12 => console.log(BigInt(result12)))
    })

    it("should transfer ownership of contract to account 2", async () => {
        await mynft.transferOwnership(accounts[1])
        await mynft.owner().then(result13 => console.log(result13))
    })

    it("should renounce ownership", async () => {
        await mynft.renounceOwnership({from: accounts[1]})
        await mynft.owner().then(result14 => console.log(result14))
    })
    /* END TEST ROUND 6 */

})
