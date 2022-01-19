import { Campaign } from "../../../ethereum/contracts";
import { db } from "../../../firebase";
import { fromWei } from "../../../components/utils";

export default async (req, res) => {
  const campaignAddress = req.query.campaignAddress;

  if (req.method === "GET") {
    try {
      const campaignContract = Campaign(campaignAddress);
      const campaignDetails = await campaignContract.methods
        .getCampaignDetails()
        .call();

      console.log(campaignDetails);
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
        isFinancing: campaignDetails[0],
        sharesOutstanding: parseInt(campaignDetails[2]),
        balance: campaignDetails[5],
        status: parseInt(campaignDetails[7]),
      };

      console.log(result);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  } else if (req.method === "PUT") {
    try {
      console.log("PUT request", req.body);
      await db
        .collection("companies")
        .doc(campaignAddress)
        .set(req.body, { merge: true });
      return res.status(200).json(data);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
};
