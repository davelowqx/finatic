const https = require("https");
const fs = require("fs");
const path = require("path");

let tickers = [
  "AAPL",
  "FB",
  "GOOG",
  "MSFT",
  "NFLX",
  "BABA",
  "AMZN",
  "TSM",
  "AMD",
  "WMT",
  "TWTR",
  "ABNB",
  "SPOT",
  "SONY",
  "SAVE",
];

const getPage = async (ticker) => {
  let url = `https://query2.finance.yahoo.com/v11/finance/quoteSummary/${ticker}?modules=assetProfile,defaultKeyStatistics,quotetype`;
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        //console.log("statusCode:", res.statusCode);
        //console.log("headers:", res.headers);
        let rawData = "";

        res.on("data", (chunk) => {
          rawData += chunk;
        });

        res.on("end", (_) => {
          let object;
          try {
            let parsedData = JSON.parse(rawData);
            let { assetProfile, quoteType, defaultKeyStatistics } =
              parsedData.quoteSummary.result[0];
            object = {
              symbol: ticker,
              name: quoteType.shortName,
              description: assetProfile.longBusinessSummary,
              sharesOutstanding: defaultKeyStatistics.sharesOutstanding.raw,
              isFinancing: Math.random() > 0.3,
            };
          } catch (error) {
            console.log(error);
          }
          resolve(object);
        });
      })
      .on("error", console.error);
  });
};

(async (_) => {
  const promises = tickers.map((ticker) => getPage(ticker));

  const data = await Promise.all(promises);
  console.log(data);

  fs.writeFileSync(
    path.resolve(__dirname, "../build/sampledata.json"),
    JSON.stringify(data.filter((obj) => obj != undefined))
  );
})();
