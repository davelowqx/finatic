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
      console.log(campaignSummaries);
      return res.status(200).json(campaignSummaries);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  } else if (req.method === "POST") {
    try {
      const { campaignAddress, name, symbol, description, imageUrl } = req.body;

      await db.collection("companies").doc(campaignAddress).set({
        campaignAddress,
        name,
        symbol,
        description,
        imageUrl,
        isFinancing: true,
      });
      return res.status(200).json({ message: "yay" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  } else {
  }
};
