import React from "react";
import CompanyCards from "../../components/CompanyCards";
import { Header, Button } from "semantic-ui-react";

export default function Explore() {
  const [companySummaries, setCompanySummaries] = React.useState([]);
  React.useEffect(async () => {
    const companySummaries = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://fundsme.vercel.app"
      }/api/companies`
    ).then((res) => res.json());

    const companyDetails = await fetch().then((res) => res.json());
    setCompanySummaries(companySummaries);
  }, []);

  const [gridView, setGridView] = React.useState(true);
  return (
    <div>
      <Button.Group size="mini">
        <Button
          toggle
          icon="list layout"
          active={gridView}
          onClick={() => setGridView(true)}
        ></Button>
        <Button
          toggle
          icon="grid layout"
          active={!gridView}
          onClick={() => setGridView(false)}
        ></Button>
      </Button.Group>

      <Header as="h5" color="grey" textAlign="center">
        {companySummaries.length} Companies Raising Capital
      </Header>
      <CompanyCards companySummaries={companySummaries} gridView={gridView} />
    </div>
  );
}
