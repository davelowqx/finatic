import web3 from "./web3";
import contracts from "./build/contracts.json";
import data from "./companyProducerAddress.json";

const companyProducer = new web3.eth.Contract(
  contracts.CompanyProducer.abi,
  data.companyProducerAddress
);

const Company = (companyAddress) => {
  return new web3.eth.Contract(contracts.Company.abi, companyAddress);
};

export { companyProducer, Company };
