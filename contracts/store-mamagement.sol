// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.27;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract StoreManagement {

    struct Product {
        string name;
        uint256 quantity;
        uint256 price;
    }
    mapping(uint256 => Product) public products;
    uint256[] public productIds;

    function addNewProduct(string memory _name, uint256 _quantity, uint256 _price) public {
        require(_quantity > 0, "Quantity must be greater than Zero");
        uint256 productId = productIds.length + 1;
        products[productId] = Product(_name, _quantity, _price);
        productIds.push(productId);
    }

    function updateStockLevel(uint256 _productId, uint256 _newQuantity) public {
        require(_newQuantity >= 0, "Quantity must not be negative");
        products[_productId].quantity = _newQuantity;
    }

    function retrieveStockLevel(uint256 _productId) public view returns(uint256) {
        return products[_productId].quantity;
    }

    function getAllProducts() public view returns(Product[] memory) {
        Product[] memory allProducts = new Product[](productIds.length);
        for (uint256 i = 0; i < productIds.length; i++) {
            allProducts[i] = products[productIds[i]];
        }
        return allProducts;
    }

    function removeProduct(uint256 _productId) public {
        require(_productId > 0 && _productId <= productIds.length, "Invalid Product Id");
        uint256 lastIndex = productIds.length - 1;
        uint256 productIdToRemove = productIds[lastIndex];
        products[_productId] = products[productIdToRemove];
        productIds[lastIndex] = _productId;
        productIds.pop;
    }


}
