// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Campaign {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    string public name;
    string public symbol;
    uint256 public decimals = 18;

    uint256 public totalSupply; 
    mapping(address => uint256) private _balances;

    address[] private _shareholders; //will contain addresses with 0 balance 

    address public managerAddress;
    uint256 public listingTimestamp;

    // funding round
    uint256 public targetAmount;
    mapping(address => uint256) investment;  
    address[] public investors; //array of unique investors
    uint8 public status;

    constructor(string memory name_, string memory symbol_, uint256 targetAmount_, address managerAddress_) {
        name = name_;
        symbol = symbol_;
        managerAddress = managerAddress_;
        targetAmount = targetAmount_;
        listingTimestamp = block.timestamp;
        status = 0;
    }

    modifier authorized() {
        require (msg.sender == managerAddress, "UNAUTHORIZED");
        _;
    }

    function concludeCampaign() public authorized {
        require(status == 0, "Campaign is not currently financing");
        if ((listingTimestamp + 86400 * 60 >= block.timestamp) && (address(this).balance >= targetAmount)) {
            status = 1;
            _distribute();
        } else {
            status = 2;
            _refund();
        } 
    }

    function _distribute() internal authorized {
        _mint(address(this).balance);
        for (uint256 i = 0; i < investors.length; i++) {
            address investor = investors[i];
            _transfer(address(this), investor, investment[investor]);
        }
    }

    function _refund() internal authorized {
        for (uint256 i = 0; i < investors.length; i++) {
            address investor = investors[i];
            payable(investor).transfer(investment[investor]);
        }
    }

    function invest() public payable {
        require(status == 0, "Campaign is not currently financing");
        if (investment[msg.sender] == 0) { // new investor
            investors.push(msg.sender);
        }
        investment[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public authorized {
        require(status == 1, "Campaign has ongoing financing round");
        payable(managerAddress).transfer(amount);
    }

    //IERC20

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address sender, address delegate) public pure returns (uint256) {
        revert();
    }

    function approve(address delegate, uint256 numTokens) public pure returns (bool) {
        revert();
    }

    function transferFrom(address sender, address recipient, uint256 amount) public pure returns (bool) {
        revert();
    }

    //Extensions
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(_balances[sender] >= amount, "insufficient balance");
        if (_balances[recipient] == 0) { //new shareholder
            _shareholders.push(recipient);
        }
        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    function _mint(uint256 sharesOffered) internal authorized {
        totalSupply += sharesOffered;
        _balances[address(this)] += sharesOffered;
        emit Transfer(address(0), address(this), sharesOffered);
    } 

    function getCampaignDetails() public view returns (string memory, 
            string memory, uint256, uint256, address, uint256, uint256, uint8) {
        return (
            name, 
            symbol, 
            totalSupply, 
            listingTimestamp,
            managerAddress, 
            address(this).balance, 
            targetAmount,
            status 
        );
    }
}