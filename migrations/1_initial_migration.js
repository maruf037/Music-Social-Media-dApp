const socialMusic = artifacts.require("/.SocialMusic.sol");

module.exports = function (deployer) {
  deployer.deploy(socialMusic);
};
