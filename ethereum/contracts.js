import web3 from "./web3";
import contracts from "./build/contracts.json";
import data from "./campaignProducerAddress.json";

const CampaignProducer = new web3.eth.Contract(
  contracts.CampaignProducer.abi,
  data.campaignProducerAddress
);

const Campaign = (campaignAddress) => {
  return new web3.eth.Contract(contracts.Campaign.abi, campaignAddress);
};

export { CampaignProducer, Campaign };
