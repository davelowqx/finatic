import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  //const provider = new Web3.providers.HttpProvider();
  web3 = new Web3(
    process.env.NODE_ENV === "development"
      ? "ws://localhost:8545"
      : "https://rinkeby.infura.io/v3/795a9e8cca664f128bcdae95c3d9f59a"
  );
}

export default web3;
