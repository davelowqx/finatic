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
        return getFundingRoundSummary(address, i);
      });
    setFundingRoundSummaries(await Promise.all(fundingRoundSummariesPromises));
    setFundingRoundDetails(await getFundingRoundDetails(address));
  }, []);

  const {
    currentAmount,
    targetAmount,
    sharesOffered,
    sharePrice,
    daysLeft,
    investorsCount,
  } = fundingRoundDetails;

  return (
    <>
      <InvestForm address={address} isFinancing={isFinancing} />
      <br />
      <ManageFundingRound address={address} isFinancing={isFinancing} />
      <div>Current Amount {currentAmount}</div>
      <div>Target Amount {targetAmount}</div>
      <div>Shares Offered {sharesOffered}</div>
      <div>Minimum Investment {sharePrice}</div>
      <div>Days Left {daysLeft}</div>
      <div>Investors {investorsCount}</div>
      <Progress percent={(100 * currentAmount) / targetAmount} indicating />
      <h2>Funding History</h2>
      {fundingRoundSummaries.map((fr) => {
        return <div>{(fr.creationTimestamp, fr.valuation)}</div>;
      })}
    </>
  );
}
