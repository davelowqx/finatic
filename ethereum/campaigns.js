import web3 from "./web3";
import { abi } from "./build/Campaign.json";

const instance = (address) => {
  return new web3.eth.Contract(abi, address);
};

export default instance;
