import { db } from "../../../firebase";
import fs from "fs";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { companyAddress, name, symbol, description, imageUrl } = req.body;

      await db.collection("companies").doc(companyAddress).set({
        companyAddress,
        name,
        symbol,
        description,
        imageUrl,
        isFinancing: false,
        activeFundingRoundDetails: {},
      });
      res.status(200).json({ message: "yay" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
