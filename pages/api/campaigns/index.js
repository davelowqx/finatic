import { db } from "../../../firebase";

/**
 * retrieved from database
 * @returns [{Campaign}, ...]
 */
export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const campaignSummaries = await db
        .collection("campaigns")
        .get()
        .then((querySnapshot) => {
          const results = [];
          querySnapshot.forEach((doc) => {
            results.push({
              campaignAddress: doc.id,
              ...doc.data(),
            });
          });
          return results;
        });
      console.log("GET /campaigns => ", campaignSummaries);
      return res.status(200).json(campaignSummaries);
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({ error: err.message });
    }
  } else if (req.method === "POST") {
    try {
      const {
        campaignAddress,
        name,
        symbol,
        description,
        imageUrl,
        managerAddress,
        listingTimestamp,
        targetAmount,
      } = req.body;

      console.log("POST /campaigns => ", req.body);

      await db.collection("campaigns").doc(campaignAddress).set({
        name,
        symbol,
        description,
        imageUrl,
        managerAddress,
        listingTimestamp,
        targetAmount,
      });
      return res.status(200).json({});
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({ error: err.message });
    }
  } else {
    return res.status(405).json({});
  }
};
