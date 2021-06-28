import { Company } from "../../../ethereum/contracts";
import { db } from "../../../firebase";
import web3 from "../../../ethereum/web3";

function timeStampToDate(timeStamp) {
  const MONTH = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(timeStamp * 1e3);
  return `${MONTH[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;
}

const fromWei = (str) => web3.utils.fromWei(str, "ether");

export default async (req, res) => {
  const address = req.query.address;

  if (req.method === "GET") {
    try {
      const company = Company(address);
      const companyDetailsETH = await company.methods
        .getCompanyDetails()
        .call();
      const { description } = await db
        .collection("companies")
        .doc(address)
        .get()
        .then((doc) => doc.data());

      const companyDetails = {
        name: companyDetailsETH[0],
        symbol: companyDetailsETH[1],
        sharesOutstanding: companyDetailsETH[2],
        balance: fromWei(companyDetailsETH[3]),
        manager: companyDetailsETH[4],
        fundingRoundsCount: companyDetailsETH[5],
        isFinancing: companyDetailsETH[6],
        listingDate: timeStampToDate(companyDetailsETH[7]),
        preMoneyValuation: fromWei(companyDetailsETH[8]),
        postMoneyValuation: fromWei(companyDetailsETH[9]),
      };

      const data = {
        ...companyDetails,
        address,
        description,
      };
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};
