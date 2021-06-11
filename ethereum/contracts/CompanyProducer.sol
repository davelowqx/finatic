// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./Company.sol";

contract CompanyProducer {
    address[] public companies;

    function createCompany(string memory name, string memory symbol, uint sharesOutstanding) public {
        Company c = new Company(name, symbol, sharesOutstanding, msg.sender);
        companies.push(address(c));
    }

    function getCompanies() public view returns (address[] memory) {
        return companies;
    }

}