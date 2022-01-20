import Web3 from "web3";

const truncateAddress = (str) => {
  if (`${str}`.length == 42) {
    return `0x${str.substring(2, 6)}...${str.substring(38)}`;
  }
};

const fromWei = (str) => {
  try {
    return Web3.utils.fromWei(`${str}`, "ether");
  } catch (err) {
    return NaN;
  }
};

const toWei = (str) => {
  try {
    return Web3.utils.toWei(`${str}`, "ether");
  } catch (err) {
    return NaN;
  }
};

function timeConverter(timestamp) {
  var date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function daysLeft(UNIX_timestamp) {
  return parseInt(
    (parseInt(UNIX_timestamp) + 60 * 24 * 60 * 60 - Date.now() / 1000) /
      (24 * 60 * 60)
  );
}

export { daysLeft, timeConverter, truncateAddress, fromWei, toWei };
