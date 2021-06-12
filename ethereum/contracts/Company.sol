// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IERC20.sol"; 

contract Company is IERC20 {

    string private _name;
    string private _symbol;
    mapping(address => uint256) private _balances;
    // mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _sharesOutstanding; //totalSupply

    address public manager;
    mapping(uint256 => FundingRound) fundingRounds;
    uint256 public fundingRoundsCount;
    bool public isSeekingFunding; 

    struct FundingRound {
        uint256 currentAmount;
        uint256 targetAmount;
        uint256 sharesOffered;
        mapping(address => uint256) investment;  
        address[] investors; //array of unique investors
    }

    constructor(string memory name_, string memory symbol_, uint256 sharesOutstanding_, address manager_) {
        _name = name_;
        _symbol = symbol_;
	_sharesOutstanding = sharesOutstanding_;
        manager = manager_;
        _balances[address(this)] = _sharesOutstanding; 
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
        fundingRoundsCount++;
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
        _mint(fr.sharesOffered);
        // distribute tokens
        for (uint256 i = 0; i < fr.investors.length; i++) {
            address investor = fr.investors[i];
            transfer(investor, fr.sharesOffered * fr.investment[investor] / fr.currentAmount);
        }
    }

    function rejectFundingRound() public authorized {
        require(isSeekingFunding);
        isSeekingFunding = false;
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        // reimburse investors
        for (uint256 i = 0; i < fr.investors.length; i++) {
            address investor = fr.investors[i];
            payable(investor).transfer(fr.investment[investor]);
        }
    }

    function invest() public payable {
        require(isSeekingFunding);
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        if (fr.investment[msg.sender] == 0) { // new investor
            fr.investors.push(msg.sender);
        }
        fr.investment[msg.sender] += msg.value;
        fr.currentAmount += msg.value;
    }

    function withdraw(uint256 amount, address payable recipient) public authorized {
        require(!isSeekingFunding);
        recipient.transfer(amount);
    }

    //IERC20
    function name() public view returns (string memory) {
	    return _name;
    }

    function symbol() public view returns (string memory) {
	    return _symbol;
    }

    function decimals() public pure returns (uint8) {
	    return 0;
    }

    function totalSupply() public override view returns (uint256) {
        return _sharesOutstanding;
    }

    function balanceOf(address account) public override view returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(amount <= _balances[msg.sender], "transfer amount exceeds balance");
        _balances[msg.sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address sender, address delegate) public override pure returns (uint256) {
        return 0;
    }

    function approve(address delegate, uint256 numTokens) public override pure returns (bool) {
        return false;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override pure returns (bool) {
        return false;
    }

    //Extensions
    function _mint(uint256 sharesOffered) internal authorized {
        _sharesOutstanding += sharesOffered;
        _balances[address(this)] += sharesOffered;
        emit Transfer(address(0), address(this), sharesOffered);
    } 

    function conductShareBuyback(uint256 sharesPurchased) public authorized {
        //TODO
    } 

    function payoutDividends(uint256 amount) public authorized {
        //TODO
    } 

    //GETTERS
    function getInvestment(address investor) public view returns (uint256) {
        require(isSeekingFunding);
        return fundingRounds[fundingRoundsCount].investment[investor];
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

    function getCompanySummary() public view returns (string memory, string memory, uint256, uint256, address,  uint256, bool) {
        return (_name, _symbol, _sharesOutstanding, address(this).balance, manager, fundingRoundsCount, isSeekingFunding);
    }

}
