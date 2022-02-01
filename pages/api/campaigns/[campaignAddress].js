import { Campaign } from "../../../ethereum/contracts";
import { db } from "../../../firebase";

export default async (req, res) => {
  const campaignAddress = req.query.campaignAddress;

  if (req.method !== "GET") {
    return res.status(405).json({});
  }
  try {
    const campaignContract = Campaign(campaignAddress);
    const campaignDetails = await campaignContract.methods
      .getCampaignDetails()
      .call();

    const {
      name,
      symbol,
      description,
      imageUrl,
      managerAddress,
      listingTimestamp,
      targetAmount,
    } = await db
      .collection("campaigns")
      .doc(campaignAddress)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        } else {
          throw new Error("Campaign does not exist");
        }
      });

    const result = {
      name,
      symbol,
      description,
      imageUrl,
      campaignAddress,
      listingTimestamp,
      managerAddress,
      targetAmount,
      sharesOutstanding: parseInt(campaignDetails[2]),
      balance: parseInt(campaignDetails[5]),
      status: parseInt(campaignDetails[7]),
    };

    console.log("GET /campaigns/[campaignAddress] => ", result);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ error: err.message });
  }
};
