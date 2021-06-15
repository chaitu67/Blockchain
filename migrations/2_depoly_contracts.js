const Boo = artifacts.require("Boo");

module.exports = function (deployer) {
  deployer.deploy(Boo,1000000);
};