import React from "react";
import { Image, Feed } from "semantic-ui-react";
import InvestorForm from "./InvestorForm";
import ManagerForm from "./ManagerForm";
import { AccountContext } from "./context/AccountContext";

export default function FundingStatus({ companyDetails }) {
  const [account, _] = React.useContext(AccountContext);
  const {
    isFinancing,
    address,
    manager,
    activeFundingRoundDetails,
    fundingRoundSummaries,
  } = companyDetails;

  return (
    <div>
      {isFinancing && (
        <>
          <InvestorForm
            address={address}
            activeFundingRoundDetails={activeFundingRoundDetails}
          />
          <br />
        </>
      )}
      {account.toUpperCase() === manager.toUpperCase() && (
        <>
          <ManagerForm
            address={address}
            manager={manager}
            isFinancing={isFinancing}
          />
          <br />
        </>
      )}
      <div className="companies-container cardborder">
        <h2>Funding History</h2>
        <FundingHistory fundingRoundSummaries={fundingRoundSummaries} />
      </div>
    </div>
  );
}

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
