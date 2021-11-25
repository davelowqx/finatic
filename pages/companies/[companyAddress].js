import React from "react";
import {
  Popup,
  TextArea,
  Form,
  Button,
  Image,
  Header,
  Card,
  Grid,
} from "semantic-ui-react";
import CompanySidePanel from "../../components/CompanySidePanel";
import { truncateAddress, timeConverter } from "../../components/utils";
import { AccountContext } from "../../components/context/AccountContext";
import { ModalContext } from "../../components/context/ModalContext";
import { storage } from "../../firebase";

export async function getServerSideProps(context) {
  return { props: { companyAddress: context.params.companyAddress } };
}

export default function Company({ companyAddress }) {
  const [companyDetails, setCompanyDetails] = React.useState({
    name: "",
    symbol: "",
    sharesOutstanding: 0,
    balance: 0,
    managerAddress: "",
    fundingRoundsCount: 0,
    isFinancing: false,
    listingTimestamp: "",
    currentValuation: "",
    postMoneyValuation: "",
    activeFundingRoundDetails: {},
    fundingRoundSummaries: [],
    description: "",
    companyAddress,
  });
  const [error, setError] = React.useState(false);
  const [refreshData, setRefreshData] = React.useState(false);
  const toggleRefreshData = () => {
    setRefreshData(!refreshData);
  };

  const fetchCompanyDetails = async () => {
    const companyDetails = await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://finatic.vercel.app"
      }/api/companies/${companyAddress}`
    ).then((res) => res.json());
    if (!companyDetails.error) {
      setCompanyDetails({ ...companyDetails });
    } else {
      setError(true);
    }
  };

  React.useEffect(() => {
    fetchCompanyDetails();
  }, [refreshData]); // refresh data when investing/managing

  return (
    <Grid>
      {!error && (
        <Grid.Row>
          <Grid.Column computer={10} mobile={16}>
            <br />
            <MainInfo
              companyDetails={companyDetails}
              toggleRefreshData={toggleRefreshData}
            />
          </Grid.Column>
          <Grid.Column computer={6} mobile={16}>
            <Grid.Row>
              <br />
              <CompanySidePanel
                companyDetails={companyDetails}
                toggleRefreshData={toggleRefreshData}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      )}
      {error && (
        <Grid.Row>
          <Grid.Column computer={10} mobile={16}>
            <br />
            <Header as="h1">Nothing to see here...</Header>
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
}

const Details = ({ companyDetails }) => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const {
      companyAddress,
      sharesOutstanding,
      balance,
      managerAddress,
      listingTimestamp,
      currentValuation,
    } = companyDetails;
    setItems([
      {
        key: 0,
        header: truncateAddress(companyAddress),
        meta: "Address of Smart Contract",
      },
      {
        key: 1,
        header: truncateAddress(managerAddress),
        href: `/profile/${managerAddress}`,
        meta: "Address of Manager",
      },
      {
        key: 2,
        header:
          currentValuation === "0" ? "UNEVALUATED" : `${currentValuation} ETH`,
        meta: "Current Valuation",
      },
      {
        key: 3,
        header: sharesOutstanding,
        meta: "Shares Outstanding",
      },
      {
        key: 4,
        header: balance + " ETH",
        meta: "Company Balance",
      },
      {
        key: 5,
        header: timeConverter(new Date(listingTimestamp)),
        meta: "Date Listed",
      },
    ]);
  }, [companyDetails]);

  return <Card.Group items={items} />;
};

const MainInfo = ({ companyDetails, toggleRefreshData }) => {
  const {
    name,
    symbol,
    description,
    companyAddress,
    managerAddress,
    imageUrl,
  } = companyDetails;

  const popup = React.useContext(ModalContext);
  const [account, _] = React.useContext(AccountContext);
  const [editView, setEditView] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [fields, setFields] = React.useState({
    description: "",
  });
  const [loading, setLoading] = React.useState(false);

  const putData = async (data) => {
    await fetch(
      `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://finatic.vercel.app"
      }/api/companies/${companyAddress}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    toggleRefreshData();
  };

  const handleEdit = async () => {
    if (editView) {
      setLoading(true);
      try {
        if (image !== null) {
          const uploadTask = storage
            .ref()
            .child(`images/${companyAddress}`)
            .put(image);
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (err) => {
              popup(err.message);
            },
            async () => {
              uploadTask.snapshot.ref.getDownloadURL().then((imageUrl) => {
                putData({ imageUrl });
              });
            }
          );
        }
        if (fields.description !== description) {
          putData({ description: fields.description });
        }
      } catch (err) {
        popup(err.message);
      } finally {
        setLoading(false);
        setImage(null);
      }
    } else {
      setFields({ description });
    }
    setEditView(!editView);
  };

  return (
    <div className="companies-container cardborder">
      <Button.Group floated="right">
        <Popup
          content="Copy Smart Contract Address"
          trigger={
            <Button
              icon="copy"
              floated="right"
              onClick={() => navigator.clipboard.writeText(companyAddress)}
            />
          }
        />
        {account &&
          managerAddress &&
          account.toUpperCase() === managerAddress.toUpperCase() &&
          !editView && (
            <Popup
              content="Edit Company Details"
              trigger={
                <Button
                  toggle
                  icon="edit"
                  loading={loading}
                  onClick={handleEdit}
                />
              }
            />
          )}
        {account &&
          managerAddress &&
          account.toUpperCase() === managerAddress.toUpperCase() &&
          editView && (
            <Popup
              content="Save"
              trigger={
                <Button
                  toggle
                  loading={loading}
                  icon="save"
                  active
                  onClick={handleEdit}
                ></Button>
              }
            />
          )}
      </Button.Group>
      <Header as="h2" floated="left">{`${name} (${symbol})`}</Header>
      <br />
      <br />
      <Image className="companies-image" bordered centered src={imageUrl} />
      {/* <div>
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
      </div> */}
      {/* <br /> */}

      <Header as="h3">Company Description:</Header>
      {!editView && <div className="companies-description">{description}</div>}
      {editView && (
        <Form>
          <div>Replace Image</div>
          <Form.Input
            type="file"
            accept="image/*"
            onChange={(event) => {
              if (event.target.files[0]) {
                const file = event.target.files[0];
                if (file.size < 1000000) {
                  setImage(file);
                } else {
                  popup("Sorry, file size must be under 1MB");
                }
              }
            }}
          />
          <TextArea
            className="companies-description-edit"
            value={fields.description}
            onChange={(event) => setFields({ description: event.target.value })}
          />
        </Form>
      )}
      <Header as="h3">Company Details:</Header>
      <Details companyDetails={companyDetails} />
      {/* <Header as="h3">Downloads:</Header> */}
      {/* <Downloads companyAddress={companyAddress} editView={editView} /> */}
    </div>
  );
};

/*
const Downloads = ({ companyAddress, editView }) => {
  if (!editView) {
    return (
      <div className="companies-download-container">
        <div style={{ display: "inline-block" }}>
          <Button
            secondary
            style={{
              marginLeft: "1em",
              marginRight: "1em",
              marginBottom: "1em",
            }}
          >
            Financial Details
          </Button>
          <Button
            secondary
            style={{
              marginLeft: "1em",
              marginRight: "1em",
              marginBottom: "1em",
            }}
          >
            Disclosures
          </Button>
          <Button
            secondary
            style={{
              marginLeft: "1em",
              marginRight: "1em",
              marginBottom: "1em",
            }}
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
  } else {
    return (
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
      </div>
    );
  }
};

*/
