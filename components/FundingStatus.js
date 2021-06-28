import React, { useEffect } from "react";
import { Image, Feed } from "semantic-ui-react";
import { getFundingRoundDetails, getFundingRoundSummary } from "./Getters";
import InvestForm from "./InvestorForm";
import ManagerForm from "./ManagerForm";

export default function FundingStatus({
  address,
  isFinancing,
  fundingRoundsCount,
}) {
  const [fundingRoundSummaries, setFundingRoundSummaries] = React.useState([]);
  const [fundingRoundDetails, setFundingRoundDetails] = React.useState({});

  useEffect(async () => {
    if (fundingRoundsCount > 0) {
      const fundingRoundSummariesPromises = Array(fundingRoundsCount)
        .fill()
        .map((_, i) => {
          return getFundingRoundSummary({ address, index: i + 1 });
        });
      setFundingRoundSummaries(
        await Promise.all(fundingRoundSummariesPromises)
      );
    }
  }, [fundingRoundsCount]);

  useEffect(async () => {
    if (isFinancing) {
      console.log(isFinancing);
      setFundingRoundDetails(await getFundingRoundDetails({ address }));
    }
  }, [isFinancing]);

  return (
    <div>
      <InvestForm
        address={address}
        isFinancing={isFinancing}
        fundingRoundDetails={fundingRoundDetails}
      />
      <br />
      <br />
      <ManagerForm address={address} isFinancing={isFinancing} />
      <br />
      <br />
      <div className="companies-container cardborder">
        <h2>Funding History</h2>
        <FundingHistory fundingRoundSummaries={fundingRoundSummaries} />
      </div>
    </div>
  );
}

function FundingHistory({ fundingRoundSummaries }) {
  if (fundingRoundSummaries.length > 0) {
    return (
      <Feed>
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
      </Feed>
    );
  } else {
    return (
      <Feed>
        <Feed.Event>
          <Feed.Label>No Funding History</Feed.Label>
        </Feed.Event>
      </Feed>
    );
  }
}
