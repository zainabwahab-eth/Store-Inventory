const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StoreManagement Contract", function () {
    let storeManagement;
    let owner;

    beforeEach(async () => {
        [owner] = await ethers.getSigners(); // Retrieve the contract deployer account


        // Deploy AdvancedStoreManagement contract (which imports BaseInventory)
        const StoreManagement = await ethers.getContractFactory("StoreManagement");
        storeManagement = await StoreManagement.deploy();
        await storeManagement.waitForDeployment();
    });

    it("should deploy StoreManagement correctly", async () => {
      // Test the initial state after deployment
      const allProducts = await storeManagement.getAllProducts();
      expect(allProducts).to.be.an("array").that.is.empty; // Initially, no products
    });


    it("Should allow adding a new product", async () => {
      await storeManagement.addNewProduct("Laptop", 10, 1000);
  
      const product = await storeManagement.products(1);
      expect(product.name).to.equal("Laptop");
      expect(product.quantity).to.equal(10);
      expect(product.price).to.equal(1000);
    });
  

    it("should update stock level of a product", async () => {
      // Add a new product first
      await storeManagement.addNewProduct("Laptop", 50, 1000);

      // Update the stock level of the added product
      await storeManagement.updateStockLevel(1, 75); // Assuming the first product has an ID of 1

      const product = await storeManagement.products(1);
      expect(product.quantity).to.equal(75);
    });


    it("should retrieve the stock level of a product", async () => {
      await storeManagement.addNewProduct("Tablet", 30, 500);
  
      const stockLevel = await storeManagement.retrieveStockLevel(1); // Assuming the product ID is 1
      expect(stockLevel).to.equal(30);
    });

    it("should retrieve all products", async () => {
      await storeManagement.addNewProduct("Keyboard", 10, 100);
      await storeManagement.addNewProduct("Mouse", 25, 50);
  
      const products = await storeManagement.getAllProducts();
      expect(products.length).to.equal(2);
      expect(products[0].name).to.equal("Keyboard");
      expect(products[1].name).to.equal("Mouse");
    });
  




    
});




