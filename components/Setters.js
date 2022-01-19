import { Campaign } from "../ethereum/contracts";
import web3 from "../ethereum/web3";

const toWei = (str) => web3.utils.toWei(str, "ether");

const getActiveAccount = async () => (await web3.eth.getAccounts())[0];

export async function invest({ campaignAddress, amount }) {
  const CampaignContract = Campaign(campaignAddress);
  await CampaignContract.methods.invest().send({
    from: await getActiveAccount(),
    value: toWei(amount),
  });
}

export async function concludeCampaign({ campaignAddress }) {
  const CampaignContract = Campaign(campaignAddress);
  await CampaignContract.methods.concludeCampaign().send({
    from: await getActiveAccount(),
  });
}

export async function withdraw({ withdrawAmount, campaignAddress }) {
  const CampaignContract = Campaign(campaignAddress);
  await CampaignContract.methods.withdraw(toWei(withdrawAmount)).send({
    from: await getActiveAccount(),
  });
}
