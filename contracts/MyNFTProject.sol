// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title MyNFTProject
contract MyNFTProject is ERC721, ERC721Enumerable, Pausable, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    // Base URI
    string baseURI;

    // Base extension
    string public baseExtension = ".json";

    // Cost of minting in wei
    uint256 public cost = 80000000000000 wei; // 0.00008 eth = 80000000000000 wei

    // Maximum mint amount per account
    uint256 public maxMintAmount = 3;

    // Maximum supply of tokens
    uint256 public maxSupply = 10;

    // Enum setting used for function status
    enum STATUS {ON, OFF}
    STATUS public funSetting = STATUS.OFF;

    constructor(string memory _initBaseURI) ERC721("MyNFTProject", "MYNFT") {
        // sets BaseURI
        setBaseURI(_initBaseURI);

        // starts NFT counter at 1
        _tokenIdCounter.increment();
    }

    /// @dev sets the base URI for the NFTs
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /**
    * @dev While the initial base URI is set at compilation, this function
    * assigns a new base URI - available to owner
    */
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    /// @dev Security feature that pauses the contract - available to owner
    function pause() public onlyOwner {
        _pause();
    }

    /// @dev Security feature that unpauses the contract - available to owner
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
    * @dev Minting function - available to the public.
    * @notice Creates your entertaining collectible.
    * Requirements:
    *
    * - the mint amount does not exceed the allowable NFT limit per account
    * - the contract is unpaused
    * - the mint amount is not equal to zero
    * - the mint amount does not exceed the max mint amount per account
    * - the mint amount does not exceed the max supply of tokens
    * - the minter has enough coin to mint
    */
    function mint(uint256 _mintAmount) public payable {
        require(balanceOf(msg.sender) <= 2, "Only 3 mints allowed per account");
        require(!paused(), "Contract is paused");
        require(_mintAmount > 0, "Mint amount is zero");
        require(_mintAmount <= maxMintAmount, "Mint amount exceeds the maximum mint amount");
        uint256 supply = totalSupply();
        require(supply + _mintAmount <= maxSupply, "Mint amount exceeds the maximum supply");

        if (msg.sender != owner()) {
            require(msg.value >= cost * _mintAmount, "Value must be equal or greater than the cost");
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    /// @dev Function returning an array of a collector's token IDs
    /// @param _owner The collector's address
    /// @return array Token IDs
    function walletOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    /**
    * @dev Function returning string of a token's URI
    * @param tokenId ID of token
    * @return string Token's URI
    * Requirements:
    *
    * - the tokenId must exist
    */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: Token does not exist"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    /**
    * @dev Function updating minting cost - available to owner
    * @param _newCost The cost of minting in wei
    * Requirements:
    *
    * - the cost is greater than zero
    */
    function setCost(uint256 _newCost) public onlyOwner {
        require(_newCost > 0, "New cost entered is zero");
        cost = _newCost;
    }

    /**
    * @dev Function updating maximum minting amount per account - available to owner
    * @param _newmaxMintAmount The maximum mint amount per account
    * Requirements:
    *
    * - the newmaxMintAmount is greater than zero
    */
    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        require(_newmaxMintAmount > 0, "Max mint amount entered is zero");
        maxMintAmount = _newmaxMintAmount;
    }

    /**
    * @dev Function updating maximum token supply - available to owner
    * @param _newmaxSupply The maximum supply of tokens
    * @notice This setting exists to accommodate potential future limited-run collections
    * Requirements:
    *
    * - the newmaxSupply is greater than zero
    * - the newmaxSupply is greater than the current totalSupply
    */
    function setmaxSupply(uint256 _newmaxSupply) public onlyOwner {
        require(_newmaxSupply > 0, "Supply entered is zero");
        uint256 supply = totalSupply();
        require(_newmaxSupply > supply, "Supply entered is less than total supply");
        maxSupply = _newmaxSupply;
    }

    /// @dev Function updating base URI extension - available to owner
    /// @param _newBaseExtension The base extension
    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    /// @dev Function setting - available to owner
    function turnOn() public onlyOwner {
        funSetting = STATUS.ON;
    }

    /// @dev Function setting - available to owner
    function turnOff() public onlyOwner {
        funSetting = STATUS.OFF;
    }

    /**
    * @dev Burns `tokenId`. See {ERC721-_burn}.
    * @param tokenId The token ID
    * @notice We wanted to include burn capability for a potential future application
    * but did not want to activate functionality before all tokens were minted.
    * Requirements:
    *
    * - function must be turned "on"
    * - The caller must own `tokenId` or be an approved operator
    */
    function burn(uint256 tokenId) public override {
        require(funSetting == STATUS.ON, "Burn not available");
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
        _burn(tokenId);
    }

    /**
    * @dev Minting function - available to owner.
    * @param to The address receiving the token
    * @param tokenId The token ID
    * @notice This is a failsafe function preserving the contract's ability to mint
    * after burn function has been activated.
    * Requirements:
    *
    * - function must be turned "on"
    * - the contract is unpaused
    * - the tokenId does not exist
    * - the to address is not zero
    * - the tokenId is not equal to zero
    * - the mint amount does not exceed the allowable NFT limit per account
    * - the mint amount does not exceed the max supply of tokens
    */
    function safeMint(address to, uint256 tokenId) public onlyOwner {
        require(funSetting == STATUS.ON, "Safemint not available");
        require(!paused(), "Contract is paused");
        require(!_exists(tokenId), "ERC721: token already minted");
        require(to != address(0), "ERC721: minted to the zero address");
        require(tokenId > 0, "Token ID is zero");
        require(balanceOf(msg.sender) <= 2, "Only 3 mints allowed per account");

        uint256 mintNumber = 1;
        uint256 supply = totalSupply();
        require(supply + mintNumber <= maxSupply, "Mint amount exceeds the maximum supply");

        _safeMint(to, tokenId, "");
    }


    /**
    * @dev Function checking the balance of the contract - available to owner
    */
    function getContractBalance() public onlyOwner view returns (uint){
        return address(this).balance;
    }

    /**
    * @dev Function withdrawing the balance of the contract - available to owner
    */
    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success);
    }

    /// @dev The following function overrides are required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal whenNotPaused
        override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    /// @dev The following function overrides are required by Solidity.
    function supportsInterface(bytes4 interfaceId) public view
        override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
