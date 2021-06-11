// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./Stonk.sol";

contract Company {

    string public name;
    address public manager;
    mapping(uint => FundingRound) fundingRounds;
    uint public fundingRoundsCount;
    bool public isRaising; 

    struct FundingRound {
        uint targetAmount;
        uint sharesOffered;
        uint currentAmount;
        mapping(address => uint) balances;  
        address[] investors; //array of unique investors
    }

    Stonk stonk;

    constructor(string memory name_, string memory symbol, uint sharesOustanding, address manager_) {
        name = name_;
        manager = manager_;
        isRaising = false;
        stonk = new Stonk(name, symbol, sharesOustanding, address(this), manager_);
    }

    error Unauthorized();

    modifier authorized() {
        if (msg.sender != manager) {
            revert Unauthorized();
        }
        _;
    }

    function createFundingRound(uint targetAmount_, uint sharesOffered_) public authorized {
        require(!isRaising);
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        fr.targetAmount = targetAmount_;
        fr.sharesOffered = sharesOffered_;
        isRaising = true;
    }

    function acceptFundingRound() public authorized {
        require(isRaising);
        isRaising = false;
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        stonk.conductShareOffering(fr.sharesOffered);
        // distribute tokens
        for (uint i = 0; i < fr.investors.length; i++) {
            address investor = fr.investors[i];
            stonk.transfer(investor, fr.sharesOffered * fr.balances[investor]/fr.currentAmount);
        }
        fundingRoundsCount++;
    }

    function invest() public payable {
        require(isRaising);
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        if (fr.balances[msg.sender] == 0) { // new investor
            fr.investors.push(msg.sender);
        }
        fr.balances[msg.sender] += msg.value;
        fr.currentAmount += msg.value;
    }

    function withdraw(uint256 amount, address payable recipient) public authorized {
        recipient.transfer(amount);
    }

    function getFundingRoundSummary(uint index) public view returns (
        uint, uint, uint 
    ) {
        return (
            fundingRounds[index].targetAmount,
            fundingRounds[index].sharesOffered,
            fundingRounds[index].currentAmount
        );
    }

    function getCompanySummary() public view returns (string memory, address, uint, uint, bool) {
        return (name, manager, address(this).balance, fundingRoundsCount, isRaising);
    }

}
