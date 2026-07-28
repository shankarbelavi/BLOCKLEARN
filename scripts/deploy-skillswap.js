const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SkillSwapContract...");

  const SkillSwapContract = await ethers.getContractFactory("SkillSwapContract");
  const skillSwapContract = await SkillSwapContract.deploy();
  await skillSwapContract.waitForDeployment();

  const contractAddress = await skillSwapContract.getAddress();
  console.log("SkillSwapContract deployed to:", contractAddress);

  return contractAddress;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
