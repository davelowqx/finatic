import React, { useEffect } from "react";
import { Image, Feed, Progress } from "semantic-ui-react";
// link render anchor tags around react components
import { getFundingRoundDetails, getFundingRoundSummary } from "./Getters";
import InvestForm from "./InvestorForm";
import ManageFundingRound from "./ManagerForm";

export default function FundingStatus({
  address,
  isFinancing,
  fundingRoundsCount,
}) {
  const [fundingRoundSummaries, setFundingRoundSummaries] = React.useState([]);
  const [fundingRoundDetails, setFundingRoundDetails] = React.useState({});

  useEffect(async () => {
    const fundingRoundSummariesPromises = Array(fundingRoundsCount)
      .fill()
      .map((_, i) => {
        return getFundingRoundSummary({ address, index: i + 1 });
      });
    setFundingRoundSummaries(await Promise.all(fundingRoundSummariesPromises));
    setFundingRoundDetails(await getFundingRoundDetails({ address }));
  }, []);

  return (
    <div>
      <InvestForm
        address={address}
        isFinancing={isFinancing}
        fundingRoundDetails={fundingRoundDetails}
      />
      <br />
      <br />
      <ManageFundingRound address={address} isFinancing={isFinancing} />
      <br />
      <br />
      <div className="companies-container cardborder">
        <h2>Funding History</h2>
        <Feed>
          <FundingHistory fundingRoundSummaries={fundingRoundSummaries} />
        </Feed>
      </div>
    </div>
  );
}

function FundingHistory({ fundingRoundSummaries }) {
  const image = "../public/static/logo.png";

  if (fundingRoundSummaries.length > 0) {
    return (
      <>
        {fundingRoundSummaries
          .reverse()
          .map(({ creationTimestamp, valuation }, index) => (
            <div key={index}>
              <Feed.Event>
                <Feed.Label className="companies-funding-history-logo">
                  <Image
                    src="/static/logo.svg"
                    className="companies-funding-history-logo"
                  />
                </Feed.Label>
                <Feed.Content
                  className="companies-funding-history-details"
                  date={`Date: ${creationTimestamp} UNIX`}
                  summary={`Valuation: ${valuation} ETH`}
                />
              </Feed.Event>
            </div>
          ))}
      </>
    );
  } else {
    return (
      <Feed.Event>
        <Feed.Label>No Funding History</Feed.Label>
      </Feed.Event>
    );
  }
}
