// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IERC20.sol"; 

contract Stonk is IERC20 {

    string public name;
    string public symbol;
    uint8 public constant decimals = 0;
    address public company;
    address public manager; //necessary?????

    mapping(address => uint256) private _balances;
    // mapping(address => mapping (address => uint256)) private _allowances;

    uint256 private sharesOutstanding;

    error Unauthorized();

    modifier authorized() {
        if (msg.sender != company) {
            revert Unauthorized();
        }
        _;
    }

    constructor(string memory name_, string memory symbol_, uint256 sharesOutstanding_, address company_, address manager_) {
        name = name_;
        symbol = symbol_; 
        sharesOutstanding = sharesOutstanding_;
        company = company_;
        manager = manager_;
        _balances[company] = sharesOutstanding; 
    }

    function totalSupply() public override view returns (uint256) {
        return sharesOutstanding;
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

    function conductShareOffering(uint256 sharesOffered) public authorized {
        sharesOutstanding += sharesOffered;
        _balances[company] += sharesOffered;
        emit Transfer(address(0), company, sharesOffered);
    } 

    function conductShareBuyback(uint256 sharesPurchased) public authorized {
        //TODO
    } 

    function payoutDividends(uint256 amount) public view authorized {
        //TODO
    } 

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        // NOT IMPLEMENTED
        /*
        _allowances[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
        */
        return false;
    }

    function allowance(address sender, address delegate) public override view returns (uint256) {
        // NOT IMPLEMENTED
        // return _allowances[sender][delegate];
        return 0;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        // NOT IMPLEMENTED
        /*
        require(amount <= _balances[sender], "transfer amount exceeds balance");
        require(amount <= _allowances[sender][msg.sender], "transfer amount exceeds allowance");

        _balances[sender] -= amount;
        _allowances[sender][msg.sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
        */
        return false;
    }
}