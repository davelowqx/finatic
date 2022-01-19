import React from "react";
import { fromWei } from "../components/utils";
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
import { truncateAddress, timeConverter } from "../components/utils";
import { AccountContext } from "../components/context/AccountContext";
import { ModalContext } from "../components/context/ModalContext";
import { storage } from "../firebase";
import { useRouter } from "next/router";
import InvestorForm from "../components/InvestorForm";
import ManagerForm from "../components/ManagerForm";

export default function Campaign() {
  const [account, _] = React.useContext(AccountContext);
  const [campaignDetails, setCampaignDetails] = React.useState({
    name: "",
    symbol: "",
    sharesOutstanding: 0,
    balance: 0,
    managerAddress: "",
    listingTimestamp: "",
    description: "",
    campaignAddress: "",
  });
  const [error, setError] = React.useState(false);
  const [refreshData, setRefreshData] = React.useState(false);

  const toggleRefreshData = () => {
    setRefreshData(!refreshData);
  };

  const fetchCampaignDetails = async (campaignAddress) => {
    try {
      const campaignDetails = await fetch(
        `/api/campaigns/${campaignAddress}`
      ).then((res) => res.json());
      setCampaignDetails({ campaignAddress, ...campaignDetails });
    } catch (err) {
      console.error(err.message);
      setError(true);
    }
  };

  const router = useRouter();

  React.useEffect(() => {
    const campaignAddress = router.query.campaignAddress;
    campaignAddress && fetchCampaignDetails(campaignAddress);
  }, [router.query, refreshData]); // refresh data when changes made

  return (
    <Grid>
      {!error && (
        <Grid.Row>
          <Grid.Column computer={10} mobile={16}>
            <br />
            <MainInfo
              campaignDetails={campaignDetails}
              toggleRefreshData={toggleRefreshData}
            />
          </Grid.Column>
          <Grid.Column computer={6} mobile={16}>
            <Grid.Row>
              <br />
              <div>
                {!campaignDetails.status && (
                  <>
                    <InvestorForm
                      account={account}
                      {...campaignDetails}
                      toggleRefreshData={toggleRefreshData}
                    />
                    <br />
                  </>
                )}
                {account &&
                  account.toUpperCase() ===
                    campaignDetails.managerAddress.toUpperCase() && (
                    <>
                      <ManagerForm
                        {...campaignDetails}
                        toggleRefreshData={toggleRefreshData}
                      />
                      <br />
                    </>
                  )}
              </div>
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

const Details = ({
  campaignAddress,
  sharesOutstanding,
  balance,
  managerAddress,
  listingTimestamp,
}) => {
  return (
    <Card.Group
      items={[
        {
          key: 0,
          header: truncateAddress(campaignAddress),
          meta: "Address of Smart Contract",
        },
        {
          key: 1,
          header: truncateAddress(managerAddress),
          meta: "Address of Manager",
        },
        {
          key: 2,
          header: sharesOutstanding,
          meta: "Shares Outstanding",
        },
        {
          key: 3,
          header: fromWei(balance) + " ETH",
          meta: "Campaign Balance",
        },
        {
          key: 4,
          header: timeConverter(new Date(listingTimestamp)),
          meta: "Date Listed",
        },
      ]}
    />
  );
};

const MainInfo = ({ campaignDetails, toggleRefreshData }) => {
  const {
    name,
    symbol,
    description,
    campaignAddress,
    managerAddress,
    imageUrl,
  } = campaignDetails;

  const popup = React.useContext(ModalContext);
  const [account, _] = React.useContext(AccountContext);
  const [editView, setEditView] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [fields, setFields] = React.useState({
    description: "",
  });
  const [loading, setLoading] = React.useState(false);

  const putData = async (data) => {
    await fetch(`/api/companies/${campaignAddress}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(data),
    });
    toggleRefreshData();
  };

  const handleEdit = async () => {
    if (editView) {
      setLoading(true);
      try {
        if (image !== null) {
          const uploadTask = storage
            .ref()
            .child(`images/${campaignAddress}`)
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
              onClick={() => navigator.clipboard.writeText(campaignAddress)}
            />
          }
        />
        {account &&
          managerAddress &&
          account.toUpperCase() === managerAddress.toUpperCase() &&
          !editView && (
            <Popup
              content="Edit Campaign Details"
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
      <br />
      <Details {...campaignDetails} />
    </div>
  );
};
