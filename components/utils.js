const truncateAddress = (str) => {
  if (`${str}`.length == 42) {
    return `0x${str.substring(2, 6)}...${str.substring(38)}`;
  }
};

export { truncateAddress };
