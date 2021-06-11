// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./Stonk.sol";

contract Company {

    string public name;
    string public symbol;
    address public manager;
    mapping(uint256 => FundingRound) fundingRounds;
    uint256 public fundingRoundsCount;
    bool public isSeekingFunding; 

    struct FundingRound {
        uint256 currentAmount;
        uint256 targetAmount;
        uint256 sharesOffered;
        mapping(address => uint256) balances;  
        address[] investors; //array of unique investors
    }

    Stonk stonk;

    constructor(string memory name_, string memory symbol_, uint256 sharesOustanding, address manager_) {
        name = name_;
        symbol = symbol_;
        manager = manager_;
        isSeekingFunding = false;
        stonk = new Stonk(name, symbol, sharesOustanding, address(this));
    }

    error Unauthorized();

    modifier authorized() {
        if (msg.sender != manager) {
            revert Unauthorized();
        }
        _;
    }

    function createFundingRound(uint256 targetAmount_, uint256 sharesOffered_) public authorized {
        require(!isSeekingFunding);
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        fr.targetAmount = targetAmount_;
        fr.sharesOffered = sharesOffered_;
        isSeekingFunding = true;
    }

    function acceptFundingRound() public authorized {
        require(isSeekingFunding);
        isSeekingFunding = false;
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        require(fr.currentAmount >= fr.targetAmount);
        stonk.conductShareOffering(fr.sharesOffered);
        // distribute tokens
        for (uint256 i = 0; i < fr.investors.length; i++) {
            address investor = fr.investors[i];
            stonk.transfer(investor, fr.sharesOffered * fr.balances[investor] / fr.currentAmount);
        }
        fundingRoundsCount++;
    }

    function rejectFundingRound() public authorized {
        require(isSeekingFunding);
        isSeekingFunding = false;
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        // reimburse investors
        for (uint256 i = 0; i < fr.investors.length; i++) {
            address investor = fr.investors[i];
            payable(investor).transfer(fr.balances[investor]);
        }
    }

    function invest() public payable {
        require(isSeekingFunding);
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        if (fr.balances[msg.sender] == 0) { // new investor
            fr.investors.push(msg.sender);
        }
        fr.balances[msg.sender] += msg.value;
        fr.currentAmount += msg.value;
    }

    function withdraw(uint256 amount, address payable recipient) public authorized {
        require(!isSeekingFunding);
        recipient.transfer(amount);
    }

    function getInvestedAmount(address investor) public view returns (uint256) {
        require(isSeekingFunding);
        return fundingRounds[fundingRoundsCount].balances[investor];
    }

    function getStonkAddress() public view returns (address) {
        return address(stonk);
    }

    function getFundingRoundSummary(uint256 index) public view returns (
        uint256, uint256, uint256 
    ) {
        return (
            fundingRounds[index].currentAmount,
            fundingRounds[index].targetAmount,
            fundingRounds[index].sharesOffered
        );
    }

    function getCompanySummary() public view returns (string memory, string memory, address, uint256, uint256, bool) {
        return (name, symbol, manager, address(this).balance, fundingRoundsCount, isSeekingFunding);
    }

}
