const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying BlockLearnToken...");

  const TokenContract = await ethers.getContractFactory("BlockLearnToken");
  const tokenContract = await TokenContract.deploy();
  await tokenContract.waitForDeployment();

  const tokenAddress = await tokenContract.getAddress();
  console.log("BlockLearnToken deployed to:", tokenAddress);

  return tokenAddress;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
