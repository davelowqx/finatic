import React from "react";
import { fromWei } from "../components/utils";
import { Popup, Button, Header, Grid, Loader } from "semantic-ui-react";
import { timeConverter } from "../components/utils";
import { AccountContext } from "../components/context/AccountContext";
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
  const [loading, setLoading] = React.useState(false);
  const [refreshData, setRefreshData] = React.useState({});

  const toggleRefreshData = () => {
    setRefreshData({});
  };

  const fetchCampaignDetails = async (campaignAddress) => {
    try {
      setLoading(true);
      const campaignDetails = await fetch(
        `/api/campaigns/${campaignAddress}`
      ).then((res) => res.json());
      setCampaignDetails({ campaignAddress, ...campaignDetails });
    } catch (err) {
      console.error(err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  React.useEffect(() => {
    const campaignAddress = router.query.campaignAddress;
    campaignAddress && fetchCampaignDetails(campaignAddress);
  }, [router.query, refreshData]); // refresh data when changes made

  return (
    <>
      {loading && (
        <div className="h-remaining relative">
          <Loader active={loading} />
        </div>
      )}
      {!loading && error && (
        <div className="h-remaining relative flex flex-col justify-center">
          <div className="">
            <Header as="h1" textAlign="center">
              Nothing to see here...
            </Header>
          </div>
        </div>
      )}
      {!loading && !error && (
        <Grid>
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
                  <InvestorForm
                    account={account}
                    {...campaignDetails}
                    toggleRefreshData={toggleRefreshData}
                  />
                  <br />
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
        </Grid>
      )}
    </>
  );
}

const MainInfo = ({ campaignDetails }) => {
  const {
    name,
    symbol,
    description,
    campaignAddress,
    managerAddress,
    imageUrl,
    listingTimestamp,
  } = campaignDetails;

  return (
    <div className="container cardborder">
      <div className="flex">
        <Header as="h3">{`${name} $${symbol}`}</Header>
      </div>
      <div>{timeConverter(listingTimestamp)}</div>
      <br />
      <div className="square">
        <img src={imageUrl} />
      </div>
      <br />
      <div>{description}</div>
      <br />

      <div className="flex my-1">
        <div>
          <b>Campaign Address</b>
          <a
            href={`https://etherscan.io/address/${campaignDetails.campaignAddress}`}
            className="block"
          >
            {campaignAddress}
          </a>
        </div>
        <div className="grow">
          <Popup
            content="Copy Smart Contract Address"
            trigger={
              <Button
                icon="copy"
                floated="right"
                size="mini"
                onClick={() => navigator.clipboard.writeText(campaignAddress)}
              />
            }
          />
        </div>
      </div>
      <div>
        <div className="flex my-1">
          <div>
            <b>Manager Address</b>
            <a
              href={`https://etherscan.io/address/${campaignDetails.managerAddress}`}
              className="block"
            >
              {campaignDetails.managerAddress}
            </a>
          </div>
          <div className="grow">
            <Popup
              content="Copy Manager Address"
              trigger={
                <Button
                  icon="copy"
                  floated="right"
                  size="mini"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      campaignDetails.managerAddress
                    )
                  }
                />
              }
            />
          </div>
        </div>
      </div>
      <div className="my-1">
        <b>Campaign Balance</b>
        <div>{fromWei(campaignDetails.balance)} ETH</div>
      </div>
      <div className="my-1">
        <b>Shares Outstanding</b>
        <div>
          {parseInt(campaignDetails.sharesOutstanding).toLocaleString()}
        </div>
      </div>
    </div>
  );
};
