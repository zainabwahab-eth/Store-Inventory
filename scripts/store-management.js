const {ethers} = require("hardhat");

async function main() {
  // Get the contract factory for StoreManagement
  const storeManagementFactory = await ethers.getContractFactory('StoreManagement');

  // Deploy the contract
  const storeManagement = await storeManagementFactory.deploy();

  const storeManagementContractAddress = await storeManagement.waitForDeployment()
  
  const contractAddress = await storeManagementContractAddress.getAddress()

  // Log the deployed contract's address
  console.log("storage management deploy to", contractAddress);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

  