import React from "react";
import CompanyCards from "../../components/CompanyCards";
import { Header, Button } from "semantic-ui-react";

export default function Explore() {
  const [companySummaries, setCompanySummaries] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://fundsme.vercel.app"
      }/api/companies`
    )
      .then((res) => res.json())
      .then((deets) => setCompanySummaries(deets.error ? [] : deets));
  }, []);
  // TODO: handle error fetching data

  const [viewFinancing, setViewFinancing] = React.useState(true);
  const len = companySummaries.filter(
    ({ isFinancing }) => isFinancing === viewFinancing
  ).length;
  return (
    <div>
      <Button.Group size="mini">
        <Button
          toggle
          content="Financing"
          active={viewFinancing}
          onClick={() => setViewFinancing(true)}
        ></Button>
        <Button
          toggle
          content="Funded"
          active={!viewFinancing}
          onClick={() => setViewFinancing(false)}
        ></Button>
      </Button.Group>

      <Header as="h5" color="grey" textAlign="center">
        {len} {len === 1 ? "Company" : "Companies"}{" "}
        {viewFinancing ? "Raising Capital" : "Funded"}
      </Header>
      <CompanyCards
        companySummaries={companySummaries}
        viewFinancing={viewFinancing}
      />
    </div>
  );
}
