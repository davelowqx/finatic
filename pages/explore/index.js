import React from "react";
import CompanyCards from "../../components/CompanyCards";
import { Header, Button } from "semantic-ui-react";
import { getCompanySummaries } from "../../components/Getters";

export async function getServerSideProps() {
  const companySummaries = await getCompanySummaries();
  return { props: { companySummaries } };
}

export default function Explore({ companySummaries }) {
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
