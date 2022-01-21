import web3 from "./web3";
import contracts from "./build/contracts.json";

const CampaignProducer = new web3.eth.Contract(
  contracts.CampaignProducer.abi,
  process.env.NEXT_PUBLIC_CAMPAIGN_PRODUCER_ADDRESS
);

const Campaign = (campaignAddress) => {
  return new web3.eth.Contract(contracts.Campaign.abi, campaignAddress);
};

export { CampaignProducer, Campaign };
