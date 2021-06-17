// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IERC20.sol"; 

contract Company is IERC20 {

    string private _name;
    string private _symbol;
    mapping(address => uint256) private _balances;
    // mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _sharesOutstanding; //totalSupply

    address[] private _holders; //will contain addresses with 0 balance 
    mapping(address => bool) private _seen; //ensures _holders contains unique addresses

    address public manager;
    mapping(uint256 => FundingRound) public fundingRounds;
    uint256 public fundingRoundsCount;
    bool public isFinancing; 

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
        manager = manager_;
        _sharesOutstanding = sharesOutstanding_;
        _balances[address(this)] = sharesOutstanding_;
        _holders.push(address(this));
        _seen[address(this)] = true;
    }

    modifier authorized() {
        require (msg.sender == manager, "UNAUTHORIZED");
        _;
    }

    function createFundingRound(uint256 targetAmount_, uint256 sharesOffered_) public authorized {
        require(!isFinancing);
        fundingRoundsCount++;
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        fr.targetAmount = targetAmount_;
        fr.sharesOffered = sharesOffered_;
        isFinancing = true;
    }

    function acceptFundingRound() public authorized {
        require(isFinancing);
        isFinancing = false;
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        require(fr.currentAmount >= fr.targetAmount);
        _mint(fr.sharesOffered);
        // distribute tokens
        for (uint256 i = 0; i < fr.investors.length; i++) {
            address investor = fr.investors[i];
            _transfer(address(this), investor, fr.sharesOffered * fr.investment[investor] / fr.currentAmount);
        }
    }

    function rejectFundingRound() public authorized {
        require(isFinancing);
        isFinancing = false;
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        // reimburse investors
        for (uint256 i = 0; i < fr.investors.length; i++) {
            address investor = fr.investors[i];
            payable(investor).transfer(fr.investment[investor]);
        }
    }

    function invest() public payable {
        require(isFinancing);
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        if (fr.investment[msg.sender] == 0) { // new investor
            fr.investors.push(msg.sender);
        }
        fr.investment[msg.sender] += msg.value;
        fr.currentAmount += msg.value;
    }

    function withdraw(uint256 amount, address payable recipient) public authorized {
        require(!isFinancing);
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
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address sender, address delegate) public override pure returns (uint256) {
        revert();
    }

    function approve(address delegate, uint256 numTokens) public override pure returns (bool) {
        revert();
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override pure returns (bool) {
        revert();
    }

    //Extensions
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(_balances[sender] >= amount, "insufficient balance");
        if (_balances[recipient] == 0 && !_seen[recipient]) { //new holder
            _holders.push(recipient);
            _seen[recipient] = true;
        }
        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    function _mint(uint256 sharesOffered) internal authorized {
        _sharesOutstanding += sharesOffered;
        _balances[address(this)] += sharesOffered;
        emit Transfer(address(0), address(this), sharesOffered);
    } 

    /*
    function _burn(uint256 sharesPurchased) internal authorized {
        require(_balances[address(this)] >= sharesPurchased, "burn amount exceeds balance");
        _sharesOutstanding -= sharesPurchased;
        _balances[address(this)] -= sharesPurchased;
        emit Transfer(address(this), address(0), sharesPurchased);
    } 

    function createTenderOffer(uint256 sharesToPurchase) public authorized {} 
    */

    function payoutDividends(uint256 amount) public authorized {
        require(address(this).balance >= amount, "insufficient balance");
        require(!isFinancing);

        for (uint256 i = 0; i < _holders.length; i++) {
            address holder = _holders[i];
            if (holder != address(this) && _balances[holder] > 0) { 
                payable(holder).transfer(amount * _balances[holder] / _sharesOutstanding);
            }
        }
    } 

    //GETTERS
    function getInvestment(address investor) public view returns (uint256) {
        require(isFinancing);
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

    function getCompanySummary() public view returns (string memory, string memory, uint256, bool) {
        return (_name, _symbol, _sharesOutstanding, isFinancing);
    }

    function getCompanyDetails() public view returns (string memory, string memory, uint256, uint256, address,  uint256, bool) {
        return (_name, _symbol, _sharesOutstanding, address(this).balance, manager, fundingRoundsCount, isFinancing);
    }

}
