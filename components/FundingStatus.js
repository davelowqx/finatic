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
      <InvestForm
        address={address}
        isFinancing={isFinancing}
        fundingRoundDetails={fundingRoundDetails}
      />
      <br />
      <ManageFundingRound address={address} isFinancing={isFinancing} />
      <br />
      <h2>Funding History</h2>
      <FundingHistory fundingRoundSummaries={fundingRoundSummaries} />
    </>
  );
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
