import React from "react";
import {
  Input,
  TextArea,
  Form,
  Button,
  Image,
  Header,
  Card,
  Grid,
} from "semantic-ui-react";
import FundingStatus from "../../components/FundingStatus";
import CopyButton from "../../components/CopyButton";
import { truncateAddress } from "../../components/utils";
import { AccountContext } from "../../components/context/AccountContext";

export async function getServerSideProps(context) {
  return { props: { address: context.params.address } };
}

export default function Company({ address }) {
  const [companyDetails, setCompanyDetails] = React.useState({
    address,
    name: "",
    symbol: "",
    sharesOutstanding: 0,
    description: "",
    balance: 0,
    manager: "",
    fundingRoundsCount: 0,
    isFinancing: false,
    listingDate: "",
    currentValuation: "",
    currentFundingRoundDetails: {},
    fundingRoundSummaries: [],
  });

  React.useEffect(async () => {
    const companyDetails = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://fundsme.vercel.app"
      }/api/companies/${address}`
    ).then((res) => res.json());
    setCompanyDetails({ ...companyDetails, address });
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <br />
          <Something companyDetails={companyDetails} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Grid.Row>
            <br />
            <FundingStatus companyDetails={companyDetails} />
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

const Details = ({ companyDetails }) => {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    const {
      address,
      sharesOutstanding,
      balance,
      manager,
      fundingRoundsCount,
      listingDate,
      currentValuation,
    } = companyDetails;
    setItems([
      {
        key: 0,
        header: truncateAddress(address),
        meta: "Address of Smart Contract",
      },
      {
        key: 1,
        header: truncateAddress(manager),
        meta: "Address of Manager",
      },
      {
        key: 2,
        header:
          currentValuation === "0" ? "UNEVALUATED" : `${currentValuation} ETH`,
        meta: "Current Valuation",
      },
      {
        key: 4,
        header: sharesOutstanding,
        meta: "Shares Outstanding",
      },
      {
        key: 5,
        header: balance + " ETH",
        meta: "Company Balance",
      },
      {
        key: 6,
        header: fundingRoundsCount,
        meta: "Number of Funding Rounds",
      },
      {
        key: 7,
        header: listingDate,
        meta: "Date Listed",
      },
    ]);
  }, [companyDetails]);

  return <Card.Group items={items} />;
};

const Downloads = ({ address }) => {
  return (
    <div className="companies-download-container">
      <div style={{ display: "inline-block" }}>
        <Button
          secondary
          style={{ marginLeft: "1em", marginRight: "1em", marginBottom: "1em" }}
        >
          Financial Details
        </Button>
        <Button
          secondary
          style={{ marginLeft: "1em", marginRight: "1em", marginBottom: "1em" }}
        >
          Disclosures
        </Button>
        <Button
          secondary
          style={{ marginLeft: "1em", marginRight: "1em", marginBottom: "1em" }}
        >
          Contract Details
        </Button>
        <Button secondary style={{ margin: "1em" }}>
          Company Roadmap
        </Button>
        <Button secondary style={{ margin: "1em" }}>
          Pitchdeck
        </Button>
        <Button secondary style={{ margin: "1em" }}>
          Founders
        </Button>
      </div>
    </div>
  );
};

const Something = ({ companyDetails }) => {
  const { name, symbol, description, address, manager } = companyDetails;
  const [account, _] = React.useContext(AccountContext);

  const [editView, setEditView] = React.useState(false);
  const [editDescription, setEditDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleEdit = () => {
    if (editView) {
      setLoading(true);
      // save form data
      try {
      } catch {
      } finally {
        setLoading(false);
      }
    }
    setEditView(!editView);
  };

  React.useEffect(() => {
    setEditDescription(description);
  }, [description]);

  const handleForm = (event) => {
    setEditDescription(event.target.value);
  };

  if (!editView) {
    return (
      <div className="companies-container cardborder">
        <Button.Group
          floated="right"
          size="mini"
          style={{ marginLeft: "10px" }}
        >
          <CopyButton floated="right" text={address} />
          {account.toUpperCase() === manager.toUpperCase() && (
            <Button toggle icon="edit" onClick={handleEdit}></Button>
          )}
        </Button.Group>
        <div style={{ fontSize: "1.25rem" }}>
          <b>{`${name} (${symbol})`}</b>
        </div>
        <Image
          className="companies-image"
          bordered
          centered
          fluid
          src="/static/company-image.jpg"
        />
        <div>
          <div style={{ float: "left" }} className="companies-pre-description">
            website
          </div>
          <div
            style={{
              position: "absolute",
              left: "47%",
            }}
            className="companies-pre-description"
          >
            location
          </div>
          <div style={{ float: "right" }} className="companies-pre-description">
            date
          </div>
        </div>
        <br />
        <Header as="h3">Company Description:</Header>
        <div className="companies-description">{description}</div>

        <Header as="h3">Company Details:</Header>
        <div className="companies-details">
          <Details companyDetails={companyDetails} />
        </div>
        <Header as="h3">Downloads:</Header>
        <Downloads address={address} />
        <br />
      </div>
    );
  } else {
    return (
      <div className="companies-container cardborder">
        <Button.Group
          floated="right"
          size="mini"
          style={{ marginLeft: "10px" }}
        >
          <Button toggle icon="save" active onClick={handleEdit}></Button>
          <CopyButton floated="right" text={address} />
        </Button.Group>
        <div style={{ fontSize: "1.25rem" }}>
          INVEST IN <b>{`${name} (${symbol})`}</b>
        </div>
        <Image
          className="companies-image"
          bordered
          centered
          fluid
          src="/static/company-image.jpg"
        />
        <div>
          <div style={{ float: "left" }} className="companies-pre-description">
            website
          </div>
          <div
            style={{
              position: "absolute",
              left: "47%",
            }}
            className="companies-pre-description"
          >
            location
          </div>
          <div style={{ float: "right" }} className="companies-pre-description">
            date
          </div>
        </div>
        <br />
        <Header as="h3">Company Description:</Header>
        <Form>
          <TextArea
            className="companies-description-edit"
            value={editDescription}
            onChange={handleForm}
          />
        </Form>

        <Header as="h3">Company Details:</Header>
        <div className="companies-details">
          <Details companyDetails={companyDetails} />
        </div>
        <Header as="h3">Downloads:</Header>
        <div>
          <div className="companies-downloads-edit-header">
            <Header as="h4">Financial Details:</Header>
          </div>
          <Input
            className="companies-downloads-edit-input"
            label="http://"
            placeholder="mysite.com"
          />
          <div className="companies-downloads-edit-header">
            <Header as="h4">Disclosures:</Header>
          </div>
          <Input
            className="companies-downloads-edit-input"
            label="http://"
            placeholder="mysite.com"
          />
          <div className="companies-downloads-edit-header">
            <Header as="h4">Contact Details:</Header>
          </div>
          <Input
            className="companies-downloads-edit-input"
            label="http://"
            placeholder="mysite.com"
          />
          <div className="companies-downloads-edit-header">
            <Header as="h4">Company Roadmap:</Header>
          </div>
          <Input
            className="companies-downloads-edit-input"
            label="http://"
            placeholder="mysite.com"
          />
          <div className="companies-downloads-edit-header">
            <Header as="h4">Pitchdeck:</Header>
          </div>
          <Input
            className="companies-downloads-edit-input"
            label="http://"
            placeholder="mysite.com"
          />
          <div className="companies-downloads-edit-header">
            <Header as="h4">Founders:</Header>
          </div>
          <Input
            className="companies-downloads-edit-input"
            label="http://"
            placeholder="mysite.com"
          />
          <br />
        </div>
      </div>
    );
  }
};
