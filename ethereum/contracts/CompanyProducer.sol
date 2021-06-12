// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./Company.sol";

contract CompanyProducer {
    address[] public companyAddresses;

    function createCompany(string calldata name, string calldata symbol, uint256 sharesOutstanding) public {
        Company c = new Company(name, symbol, sharesOutstanding, msg.sender);
        companyAddresses.push(address(c));
    }

    function getCompanyAddresses() public view returns (address[] memory) {
        return companyAddresses;
    }

}