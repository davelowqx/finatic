// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./Campaign.sol";

contract CampaignProducer {
    address[] public CampaignAddresses;

    event ListCampaign(address indexed campaignAddress);

    function listCampaign(string calldata name, string calldata symbol, uint256 targetAmount) public {
        Campaign c = new Campaign(name, symbol, targetAmount, msg.sender);
        CampaignAddresses.push(address(c));
        emit ListCampaign(address(c));
    }

    function getCampaignAddresses() public view returns (address[] memory) {
        return CampaignAddresses;
    }

}