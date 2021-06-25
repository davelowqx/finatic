import React, { useEffect } from "react";
import { Progress } from "semantic-ui-react";
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
    <>
      <InvestForm address={address} isFinancing={isFinancing} />
      <br />
      <ManageFundingRound address={address} isFinancing={isFinancing} />
      <ActiveFundingRound
        isFinancing={isFinancing}
        fundingRoundDetails={fundingRoundDetails}
      />
      <h2>Funding History</h2>
      <FundingHistory fundingRoundSummaries={fundingRoundSummaries} />
    </>
  );
}

function ActiveFundingRound({ isFinancing, fundingRoundDetails }) {
  const {
    currentAmount,
    targetAmount,
    sharesOffered,
    sharePrice,
    daysLeft,
    investorsCount,
  } = fundingRoundDetails;
  if (isFinancing) {
    return (
      <>
        <div>Current Amount {currentAmount}</div>
        <div>Target Amount {targetAmount}</div>
        <div>Shares Offered {sharesOffered}</div>
        <div>Minimum Investment {sharePrice}</div>
        <div>Days Left {daysLeft}</div>
        <div>Investors {investorsCount}</div>
        <Progress percent={(100 * currentAmount) / targetAmount} indicating />
      </>
    );
  } else {
    return <></>;
  }
}

function FundingHistory({ fundingRoundSummaries }) {
  if (fundingRoundSummaries.length > 0) {
    return (
      <>
        {fundingRoundSummaries
          .reverse()
          .map(({ creationTimestamp, valuation }, index) => (
            <div
              key={index}
            >{`${creationTimestamp} UNIX : ${valuation} ETH`}</div>
          ))}
      </>
    );
  } else {
    return <div>Nothing to See Here!</div>;
  }
}
