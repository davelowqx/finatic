import web3 from "./web3";
import contracts from "./build/contracts.json";
import data from "./address.json";

const CompanyProducer = new web3.eth.Contract(
  contracts.CompanyProducer.abi,
  data.address
);
//"0x3E7A94665c3d3Ab305ac673dE40E3fb1e394DC96"

const Company = (address) => {
  return new web3.eth.Contract(contracts.Company.abi, address);
};

export { CompanyProducer, Company };
