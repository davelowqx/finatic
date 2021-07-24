import { db } from "../../../firebase";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { address, name, symbol, sharesOutstanding, description } =
        req.body;

      await db.collection("companies").doc(address).set({
        address,
        name,
        symbol,
        sharesOutstanding,
        description,
        isFinancing: false,
        fundingRounds: [],
      });
      res.status(200).json({ message: "yay" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
