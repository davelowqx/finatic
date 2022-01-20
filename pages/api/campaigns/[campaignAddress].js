import { Campaign } from "../../../ethereum/contracts";
import { db } from "../../../firebase";

export default async (req, res) => {
  const campaignAddress = req.query.campaignAddress;

  if (req.method === "GET") {
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
      return res.status(400).json({ error: e.message });
    }
  } else if (req.method === "PUT") {
    try {
      console.log("PUT /campaigns/[campaignAddress] => ", req.body);
      const { imageUrl, description } = req.body;
      if (!imageUrl || !description) {
        throw new Error("Unauthorized");
      }
      await db
        .collection("companies")
        .doc(campaignAddress)
        .set({ imageUrl, description }, { merge: true });
      return res.status(200).json(data);
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({ error: err.message });
    }
  }
};
