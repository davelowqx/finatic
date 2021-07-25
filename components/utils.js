import Web3 from "web3";

const truncateAddress = (str) => {
  if (`${str}`.length == 42) {
    return `0x${str.substring(2, 6)}...${str.substring(38)}`;
  }
};

const fromWei = (val) => Web3.utils.fromWei(val.toString(), "ether");

function timeConverter(UNIX_timestamp) {
  var convertedTimestamp = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = convertedTimestamp.getFullYear();
  var month = months[convertedTimestamp.getMonth()];
  var date = convertedTimestamp.getDate();
  var hour = convertedTimestamp.getHours();
  var min = convertedTimestamp.getMinutes();
  var sec = convertedTimestamp.getSeconds();
  var time = date + " " + month + " " + year;
  // date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

function daysLeft(UNIX_timestamp) {
  return parseInt(
    (parseInt(UNIX_timestamp) + 60 * 24 * 60 * 60 - Date.now() / 1000) /
      (24 * 60 * 60)
  );
}

export { daysLeft, timeConverter, truncateAddress, fromWei };
