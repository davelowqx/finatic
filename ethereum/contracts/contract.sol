// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract CompanyProducer {
    address[] public companies;

    function createCompany(string memory name, string memory symbol, uint sharesOutstanding, uint targetAmount) public {
        Company c = new Company(name, symbol, targetAmount, sharesOutstanding, msg.sender);
        companies.push(address(c));
    }

    function getCompanies() public view returns (address[] memory) {
        return companies;
    }

}

contract Company {

    address public manager;
    uint public targetAmount;
    bool public isFundraising; 
    mapping(address => uint) public investors;  
    uint public investorsCount;
    Share share;

    constructor(string memory name, string memory symbol, uint sharesOustanding, uint targetAmount_, address manager_) {
        manager = manager_;
        targetAmount = targetAmount_;
        isFundraising = true;
        share = new Share(name, symbol, sharesOustanding);
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
            manager
        );
    }

    function approve() public {
        require(msg.sender == manager);
        isFundraising = false;

    }
}


interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract Share is IERC20 {

    string public name;
    string public symbol;
    uint8 public constant decimals = 0;

    mapping(address => uint256) private _balances;
    mapping(address => mapping (address => uint256)) private _allowances;

    uint256 private _totalSupply;

   constructor(string memory name_, string memory symbol_, uint256 totalSupply_) {
        name = name_;
        symbol = symbol_; 
        _totalSupply = totalSupply_;
        _balances[msg.sender] = _totalSupply;
    }

   function totalSupply() public override view returns (uint256) {
    return _totalSupply;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return _balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= _balances[msg.sender]);
        _balances[msg.sender] = _balances[msg.sender] - (numTokens);
        _balances[receiver] = _balances[receiver] + (numTokens);
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        _allowances[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return _allowances[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= _balances[owner]);
        require(numTokens <= _allowances[owner][msg.sender]);

        _balances[owner] = _balances[owner] - (numTokens);
        _allowances[owner][msg.sender] = _allowances[owner][msg.sender] - (numTokens);
        _balances[buyer] = _balances[buyer] + (numTokens);
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
