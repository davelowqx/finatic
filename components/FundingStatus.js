import React, { useEffect } from "react";
import { Progress } from "semantic-ui-react";
import web3 from "../ethereum/web3";
// link render anchor tags around react components
import { getFundingRoundDetails, getFundingRoundSummary } from "./Getters";
import InvestForm from "./InvestForm";
import ManageFundingRound from "./ManageFundingRound";

export default function FundingStatus({
  address,
  isFinancing,
  fundingRoundsCount,
}) {
  const [fundingRoundSummaries, setFundingRoundSummaries] = React.useState([]);
  const [fundingRoundDetails, setFundingRoundDetails] = React.useState({});
  const [currentTime, setCurrentTime] = React.useState(0);

  useEffect(async () => {
    const fundingRoundSummariesPromises = Array(fundingRoundsCount)
      .fill()
      .map((_, i) => {
        return getFundingRoundSummary(address, i);
      });
    setFundingRoundSummaries(await Promise.all(fundingRoundSummariesPromises));
    setFundingRoundDetails(await getFundingRoundDetails(address));
    setCurrentTime(await web3.eth.getBlock("latest"));
  }, []);

  return (
    <>
      <InvestForm address={address} isFinancing={isFinancing} />
      <br />
      <ManageFundingRound address={address} isFinancing={isFinancing} />
      <div>Current Amount {fundingRoundDetails.currentAmount}</div>
      <div>Target Amount {fundingRoundDetails.targetAmount}</div>
      <div>Shares Offered {fundingRoundDetails.sharesOffered}</div>
      <div>Minimum Investment {fundingRoundDetails.currentAmount}</div>
      <div>Time Left {fundingRoundDetails.creationTimestamp}</div>
      <div>Investors {fundingRoundDetails.investorsCount}</div>
      <h2>Funding History</h2>
      {fundingRoundSummaries.map((fr) => {
        return <div>{(fr.creationTimestamp, fr.valuation)}</div>;
      })}
    </>
  );
}

//<Progress percent={percent} indicating />;
