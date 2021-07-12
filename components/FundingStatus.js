import React from "react";
import { Image, Feed } from "semantic-ui-react";
import InvestForm from "./InvestorForm";
import ManagerForm from "./ManagerForm";

export default function FundingStatus({
  fundingRoundSummaries,
  currentFundingRoundDetails,
  isFinancing,
  address,
}) {
  return (
    <div>
      <InvestForm
        address={address}
        isFinancing={isFinancing}
        fundingRoundDetails={currentFundingRoundDetails}
      />
      <br />
      <br />
      <ManagerForm address={address} isFinancing={isFinancing} />
      <br />
      <br />
      {/*
      <div className="companies-container cardborder">
        <h2>Funding History</h2>
        <FundingHistory fundingRoundSummaries={fundingRoundSummaries}>
         </div>
      */}
    </div>
  );
}

/*
function FundingHistory({ fundingRoundSummaries }) {
  fundingRoundSummaries = fundingRoundSummaries.filter((x) => x !== null);
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
*/
