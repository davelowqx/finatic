import web3 from "./web3";
import contracts from "./build/contracts.json";
import data from "./address.json";

const companyProducer = new web3.eth.Contract(
  contracts.CompanyProducer.abi,
  data.address
);

const Company = (address) => {
  return new web3.eth.Contract(contracts.Company.abi, address);
};

export { companyProducer, Company };
