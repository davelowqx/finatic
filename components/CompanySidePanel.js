import React from "react";
import { Image, Feed } from "semantic-ui-react";
import InvestorForm from "./InvestorForm";
import ManagerForm from "./ManagerForm";
import { AccountContext } from "./context/AccountContext";
import { timeConverter } from "./utils";

export default function CompanySidePanel({
  companyDetails,
  toggleRefreshData,
}) {
  const [account, _] = React.useContext(AccountContext);
  const {
    isFinancing,
    companyAddress,
    managerAddress,
    currentValuation,
    activeFundingRoundDetails,
    balance,
    fundingRoundSummaries,
  } = companyDetails;

  return (
    <div>
      {isFinancing && (
        <>
          <InvestorForm
            account={account}
            companyAddress={companyAddress}
            currentValuation={currentValuation}
            activeFundingRoundDetails={activeFundingRoundDetails}
            toggleRefreshData={toggleRefreshData}
          />
          <br />
        </>
      )}
      {account &&
        managerAddress &&
        account.toUpperCase() === managerAddress.toUpperCase() && (
          <>
            <ManagerForm
              companyAddress={companyAddress}
              managerAddress={managerAddress}
              isFinancing={isFinancing}
              balance={balance}
              toggleRefreshData={toggleRefreshData}
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

  return (
    <Feed>
      {fundingRoundSummaries.length > 0 &&
        fundingRoundSummaries
          .reverse()
          .map(
            (
              { creationTimestamp, sharePrice, sharesOutstanding, status },
              index
            ) => (
              <div className="cardborder fundinground" key={index}>
                <Feed.Event className="companies-funding-history-event">
                  <Feed.Label className="companies-funding-history-logo">
                    <Image
                      src={
                        status === 0
                          ? "/static/logo_gray.svg"
                          : status === 1
                          ? "/static/logo.svg"
                          : "/static/logo_fail.svg"
                      }
                      className="companies-funding-history-logo"
                    />
                  </Feed.Label>
                  <Feed.Content
                    className="companies-funding-history-details"
                    date={`Date: ${timeConverter(creationTimestamp)}`}
                    summary={`Valuation: ${sharesOutstanding * sharePrice} ETH`}
                    content={`Share Price: ${sharePrice}`}
                  />
                </Feed.Event>
              </div>
            )
          )}
      {fundingRoundSummaries.length === 0 && (
        <div className="cardborder fundinground">
          <Feed.Event className="companies-funding-history-event">
            <Feed.Content
              className="companies-funding-history-details"
              content="No Data"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            />
          </Feed.Event>
        </div>
      )}
    </Feed>
  );
}
