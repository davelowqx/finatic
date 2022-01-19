import web3 from "./web3";
import contracts from "./build/contracts.json";
import data from "./CampaignProducerAddress.json";

const CampaignProducer = new web3.eth.Contract(
  contracts.CampaignProducer.abi,
  data.CampaignProducerAddress
);

const Campaign = (CampaignAddress) => {
  return new web3.eth.Contract(contracts.Campaign.abi, CampaignAddress);
};

export { CampaignProducer, Campaign };
