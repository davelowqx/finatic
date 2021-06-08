// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract CampaignFactory {
    address[] public campaigns;

    function createCampaign(uint targetAmount) public {
        Campaign c = new Campaign(targetAmount, msg.sender);
        campaigns.push(address(c));
    }

    function getCampaigns() public view returns (address[] memory) {
        return campaigns;
    }

}

contract Campaign {

    address public founder;
    uint public targetAmount;
    mapping(address => uint) public investors;  
    uint public investorsCount;

    modifier restricted() {
        require(msg.sender == founder);
        _;
    }

    constructor(uint _targetAmount, address _founder) {
        founder = _founder;
        targetAmount = _targetAmount;
    }

    function invest() public payable {
        if (investors[msg.sender] == 0) { // new investor
            investorsCount++;
        }
        investors[msg.sender] += msg.value;
    }

    function getSummary() public view returns (
        uint, uint, uint, address
    ) {
        return (
            targetAmount,
            address(this).balance,
            investorsCount,
            founder
        );
    }
}
