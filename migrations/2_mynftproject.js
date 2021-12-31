const MyNFTProject = artifacts.require("MyNFTProject");

module.exports = function (deployer) {
    const baseURI = `ipfs://${process.env.IPFS_IMAGE_METADATA_CID}/`
    deployer.deploy(MyNFTProject, baseURI);
};
