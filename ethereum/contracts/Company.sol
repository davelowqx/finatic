// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IERC20.sol"; 

contract Company is IERC20 {

    string private _name;
    string private _symbol;
    mapping(address => uint256) private _balances;
    // mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _sharesOutstanding; //totalSupply

    address[] private _shareholders; //will contain addresses with 0 balance 
    mapping(address => bool) private _seen; //ensures _shareholders contains unique addresses

    address public manager;
    mapping(uint256 => FundingRound) public fundingRounds;
    uint256 public fundingRoundsCount;
    bool public isFinancing; 

    uint256 public listingTimestamp;

    struct FundingRound {
        uint256 currentAmount;
        uint256 targetAmount;
        uint256 sharesOffered;
        uint256 sharePrice;
        uint256 sharesOutstanding;
        uint256 creationTimestamp;
        mapping(address => uint256) investment;  
        address[] investors; //array of unique investors
    }

    constructor(string memory name_, string memory symbol_, uint256 sharesOutstanding_, address manager_) {
        _name = name_;
        _symbol = symbol_;
        manager = manager_;
        _sharesOutstanding = sharesOutstanding_;
        _balances[address(this)] = sharesOutstanding_;
        _shareholders.push(address(this));
        _seen[address(this)] = true;
        listingTimestamp = block.timestamp;
    }

    modifier authorized() {
        require (msg.sender == manager, "UNAUTHORIZED");
        _;
    }

    function createFundingRound(uint256 targetAmount_, uint256 sharesOffered_) public authorized {
        require(!isFinancing, "company has ongoing financing round");
        fundingRoundsCount++;
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        fr.targetAmount = targetAmount_;
        fr.sharesOffered = sharesOffered_;
        fr.sharePrice = targetAmount_/sharesOffered_; 
        fr.sharesOutstanding = _sharesOutstanding + sharesOffered_;
        fr.creationTimestamp = block.timestamp; 
        isFinancing = true;
    }

    function concludeFundingRound() public authorized {
        require(isFinancing, "company is not currently financing");
        isFinancing = false;
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        if ((fr.creationTimestamp + 86400 * 60 >= block.timestamp) && (fr.currentAmount >= fr.targetAmount)) {
            _distribute();
        } else {
            _refund();
        } 
    }

    function _distribute() internal authorized {
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        _mint(fr.sharesOffered);
        fr.sharePrice = fr.currentAmount/fr.sharesOffered;
        for (uint256 i = 0; i < fr.investors.length; i++) {
            address investor = fr.investors[i];
            _transfer(address(this), investor, fr.investment[investor] / fr.sharePrice);
        }
    }

    function _refund() internal authorized {
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        for (uint256 i = 0; i < fr.investors.length; i++) {
            address investor = fr.investors[i];
            payable(investor).transfer(fr.investment[investor]);
        }
    }

    function invest() public payable {
        require(isFinancing, "company is not currently financing");
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        require(msg.value >= fr.sharePrice, "amount less than minimum investment");
        if (fr.investment[msg.sender] == 0) { // new investor
            fr.investors.push(msg.sender);
        }
        fr.investment[msg.sender] += msg.value;
        fr.currentAmount += msg.value;
    }

    function withdraw(uint256 amount, address payable recipient) public authorized {
        require(!isFinancing, "company has ongoing financing round");
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
            _shareholders.push(recipient);
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
        require(!isFinancing, "company has ongoing financing round");

        for (uint256 i = 0; i < _shareholders.length; i++) {
            address holder = _shareholders[i];
            if (holder != address(this) && _balances[holder] > 0) { 
                payable(holder).transfer(amount * _balances[holder] / _sharesOutstanding);
            }
        }
    } 

    //GETTERS
    function getInvestment(address investor) public view returns (uint256) {
        require(isFinancing, "company is not currently financing");
        return fundingRounds[fundingRoundsCount].investment[investor];
    }

    function getFundingRoundSummary(uint256 index) public view returns (
        uint256, uint256 
    ) {
        FundingRound storage fr = fundingRounds[index];
        return (
            fr.creationTimestamp,
            fr.sharesOutstanding * fr.sharePrice
        );
    }

    function getFundingRoundDetails() public view returns (
        uint256, uint256, uint256, uint256, uint256, uint256
    ) {
        FundingRound storage fr = fundingRounds[fundingRoundsCount];
        return (
            fr.currentAmount,
            fr.targetAmount,
            fr.sharesOffered,
            fr.sharePrice,
            fr.creationTimestamp,
            fr.investors.length
        );
    }

    function getCompanySummary() public view returns (string memory, string memory, uint256, bool) {
        return (_name, _symbol, _sharesOutstanding, isFinancing);
    }

    function getCompanyDetails() public view returns (string memory, string memory, uint256, uint256, address,  uint256, bool, uint256, uint256, uint256) {
        uint256 preMoneyValuation;
        uint256 postMoneyValuation;
        if (isFinancing) {
            FundingRound storage fr = fundingRounds[fundingRoundsCount];
            postMoneyValuation = fr.sharesOutstanding * fr.sharePrice;
        }
        if (fundingRoundsCount > 1 && isFinancing) {
            FundingRound storage fr = fundingRounds[fundingRoundsCount - 1];
            preMoneyValuation = fr.sharesOutstanding * fr.sharePrice;
        } 

        return (
            _name, 
            _symbol, 
            _sharesOutstanding, 
            address(this).balance, 
            manager, 
            fundingRoundsCount, 
            isFinancing, 
            listingTimestamp, 
            preMoneyValuation,
            postMoneyValuation
        );
    }

}
