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

    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool isComplete;
        uint approvalsCount;
        mapping(address => bool) approvals; // can we optimize this
    }

    mapping(uint => Request) public requests;
    uint public requestsCount;

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

    function createRequest(string calldata description, uint value, address payable recipient) public restricted {
        Request storage r = requests[requestsCount++];
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.isComplete = false;
        r.approvalsCount = 0;
    }

    function getRequest(uint index) public view returns (string memory, uint, address, bool, uint) {
        Request storage r = requests[index];
        return (
            r.description,
            r.value,
            r.recipient,
            r.isComplete,
            r.approvalsCount
        ); 
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(investors[msg.sender] > 0);
        require(!request.approvals[msg.sender]);
        require(!request.isComplete);

        request.approvals[msg.sender] = true;
        request.approvalsCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalsCount > (investorsCount / 2)); // more than 50%
        require(!request.isComplete);

        request.recipient.transfer(request.value);
        request.isComplete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            targetAmount,
            address(this).balance,
            requestsCount,
            investorsCount,
            founder
        );
    }
}
