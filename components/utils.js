import Web3 from "web3";

const truncateAddress = (str) => {
  if (`${str}`.length == 42) {
    return `0x${str.substring(2, 6)}...${str.substring(38)}`;
  }
};

const fromWei = (val) => Web3.utils.fromWei(val.toString(), "ether");

export { truncateAddress, fromWei };
