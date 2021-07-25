import React from "react";
import { Image, Feed } from "semantic-ui-react";
import InvestorForm from "./InvestorForm";
import ManagerForm from "./ManagerForm";
import { AccountContext } from "./context/AccountContext";
import { timeConverter } from "../components/utils";

export default function FundingStatus({ companyDetails }) {
  const [account, _] = React.useContext(AccountContext);
  const {
    isFinancing,
    companyAddress,
    managerAddress,
    currentValuation,
    postMoneyValuation,
    activeFundingRoundDetails,
    fundingRoundSummaries,
  } = companyDetails;

  return (
    <div>
      {isFinancing && (
        <>
          <InvestorForm
            companyAddress={companyAddress}
            currentValuation={currentValuation}
            postMoneyValuation={postMoneyValuation}
            activeFundingRoundDetails={activeFundingRoundDetails}
          />
          <br />
        </>
      )}
      {account.toUpperCase() === managerAddress.toUpperCase() && (
        <>
          <ManagerForm
            companyAddress={companyAddress}
            managerAddress={managerAddress}
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
          .map(({ status, creationTimestamp, valuation }, index) => (
            <div className="cardborder fundinground" key={index}>
              <Feed.Event className="companies-funding-history-event">
                <Feed.Label className="companies-funding-history-logo">
                  <Image
                    src="/static/logo.svg"
                    className="companies-funding-history-logo"
                  />
                </Feed.Label>
                <Feed.Content
                  className="companies-funding-history-details"
                  date={`Date: ${timeConverter(creationTimestamp)}`}
                  summary={`Valuation: ${valuation} ETH`}
                  content={`Success: ${status}`}
                />
              </Feed.Event>
            </div>
          ))}
      </Feed>
    );
  } else {
    return (
      <Feed>
        <div className="cardborder fundinground">
          <Feed.Event className="companies-funding-history-event">
            <Feed.Content
              className="companies-funding-history-details"
              content="No Data"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            />
          </Feed.Event>
        </div>
      </Feed>
    );
  }
}
