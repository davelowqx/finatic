import web3 from "./web3";
import { abi } from "./build/CampaignFactory.json";
import { address } from "./contractAddress.json";

// need to get instance of campaign factory from somewhere else
// other than the application, so can just import this file
// replace latest factory address here
const instance = new web3.eth.Contract(abi, address); //"0x3E7A94665c3d3Ab305ac673dE40E3fb1e394DC96"

//console.log(instance);

export default instance;
