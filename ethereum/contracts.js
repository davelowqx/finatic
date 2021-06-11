import web3 from "./web3";
import contracts from "./build/contracts.json";
import data from "./address.json";

const companyProducer = new web3.eth.Contract(
  contracts.CompanyProducer.abi,
  data.address
);
//"0x3E7A94665c3d3Ab305ac673dE40E3fb1e394DC96"

const company = (address) => {
  return new web3.eth.Contract(contracts.Company.abi, address);
};

const stonk = (address) => {
  return new web3.eth.Contract(contracts.Stonk.abi, address);
};

export { companyProducer, company, stonk };
