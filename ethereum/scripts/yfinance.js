const https = require("https");
const fs = require("fs");
const path = require("path");

let tickers = ["AAPL", "FB", "GOOG", "MSFT", "NFLX", "BABA", "AMZN"];

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
              sharesOutstanding: Math.round(Math.random() * 1000), //defaultKeyStatistics.sharesOutstanding.raw
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

(async () => {
  const promises = tickers.map((ticker) => getPage(ticker));

  const data = await Promise.all(promises);
  console.log(data);

  fs.writeFileSync(
    path.resolve(__dirname, "../build/sampledata.json"),
    JSON.stringify(data.filter((obj) => obj != undefined))
  );
})();
