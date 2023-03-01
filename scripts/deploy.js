const { ethers } = require("hardhat");
const hre = require("hardhat");

require("@nomiclabs/hardhat-etherscan");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function main() {
  const { chainId } = await ethers.provider.getNetwork();
  console.log("chainId: ", chainId);

  const [deployer] = await ethers.getSigners();

  console.log("\nDeployer address:", deployer.address);
  console.log("Deployer balance:", (await deployer.getBalance()).toString());

  const contract_factory = await ethers.getContractFactory("bank");
  const contract = await contract_factory.deploy();
  console.log("contract address:", contract.address);

  if (chainId != 31337) {
    await delay(60000);

    await hre.run("verify:verify", {
      address: contract.address,
    });
    console.log("contract verified");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
