const truncateAddress = (str) => {
  if (str.length == 42) {
    const s = str.toUpperCase();
    return `0x${s.substring(2, 6)}...${s.substring(38)}`;
  }
};

export { truncateAddress };
