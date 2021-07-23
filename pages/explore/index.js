import React from "react";
import CompanyCards from "../../components/CompanyCards";
import { Header, Button, Pagination } from "semantic-ui-react";

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

  const [pageNumber, setPageNumber] = React.useState(0);
  const companiesPerPage = 6;
  const pagesVisited = pageNumber * companiesPerPage;
  const displayCompanies = pagesVisited + companiesPerPage;
  const pageCount = Math.ceil(
    companySummaries.filter(({ isFinancing }) =>
      viewFinancing ? isFinancing : !isFinancing
    ).length / companiesPerPage
  );
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [viewFinancing, setViewFinancing] = React.useState(true);
  const len = companySummaries.filter(
    ({ isFinancing }) => isFinancing === viewFinancing
  ).length;

  return (
    <div>
      <br />
      <div className="container11">
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
      </div>

      <Header as="h5" color="grey" textAlign="center">
        {len} {len === 1 ? "Company" : "Companies"}{" "}
        {viewFinancing ? "Raising Capital" : "Funded"}
      </Header>
      <CompanyCards
        companySummaries={companySummaries}
        viewFinancing={viewFinancing}
        slicemin={pagesVisited}
        slicemax={displayCompanies}
      />
      <br />
      <br />
      <div className="container11">
        <Pagination
          defaultActivePage={1}
          totalPages={pageCount}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
