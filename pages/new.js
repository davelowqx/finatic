import React from "react";
import {
  Container,
  Image,
  Header,
  TextArea,
  Form,
  Button,
  Grid,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import { CampaignProducer } from "../ethereum/contracts";
import web3 from "../ethereum/web3";
import Web3 from "web3";
import { storage } from "../firebase";
import { ModalContext } from "../components/context/ModalContext";
import { AccountContext } from "../components/context/AccountContext";

export default function CampaignNew() {
  const [fields, setFields] = React.useState({
    name: "",
    symbol: "",
    description: "",
    targetAmount: "",
  });
  const router = useRouter();

  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const popup = React.useContext(ModalContext);
  const [account, _] = React.useContext(AccountContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!account) {
      popup("Please connect wallet first");
      return;
    }
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      const managerAddress = accounts[0];

      await CampaignProducer.methods
        .listCampaign(
          fields.name,
          fields.symbol,
          Web3.utils.toWei(fields.targetAmount, "ether")
        )
        .send({
          from: managerAddress,
        })
        .on("receipt", (receipt) => {
          const campaignAddress =
            receipt.events.ListCampaign.returnValues.campaignAddress;
          console.log(campaignAddress);

          const uploadTask = storage
            .ref()
            .child(`images/${campaignAddress}`)
            .put(image);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot);
            },
            async (err) => {
              await fetch(`/api/campaigns`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                  ...fields,
                  targetAmount: Web3.utils.toWei(fields.targetAmount, "ether"),
                  imageUrl: "https://via.placeholder.com/1000.png",
                  managerAddress,
                  campaignAddress,
                  listingTimestamp: parseInt(Date.now() / 1000),
                }),
              });
              router.push(`/${campaignAddress}`);
            },
            async () => {
              // success
              const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
              await fetch(`/api/campaigns`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({
                  ...fields,
                  targetAmount: Web3.utils.toWei(fields.targetAmount, "ether"),
                  imageUrl,
                  managerAddress,
                  campaignAddress,
                  listingTimestamp: parseInt(Date.now() / 1000),
                }),
              });
              router.push(`/${campaignAddress}`);
            }
          );
        });
    } catch (err) {
      popup(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "640px", margin: "auto" }}>
      <br />
      <div className="cardborder container">
        <br />
        <Image src="/logo.svg" size="mini" centered />
        <Header as="h2" textAlign="center">
          List your Campaign!
        </Header>
        <Form>
          <Form.Input
            label="Name"
            placeholder="Avocado Toast"
            value={fields.name}
            onChange={(event) =>
              setFields({
                ...fields,
                name: event.target.value.substring(0, 31),
              })
            }
            error={fields.name.length > 30}
          />
          <br />
          <Form.Input
            label="Symbol"
            placeholder="AT"
            value={fields.symbol}
            onChange={(event) =>
              setFields({
                ...fields,
                symbol: event.target.value.substring(0, 6).toUpperCase(),
              })
            }
            error={fields.symbol.length > 5}
          />
          <br />
          <Form.Field
            control={TextArea}
            label="Desciption"
            placeholder="Planning to buy avocado toast for everyone."
            value={fields.description}
            onChange={(event) =>
              setFields({
                ...fields,
                description: event.target.value,
              })
            }
          />
          <br />
          <Form.Input
            label="Target Amount (ETH)"
            placeholder="0.1"
            type="number"
            value={fields.targetAmount}
            onChange={(event) => {
              setFields({
                ...fields,
                targetAmount: event.target.value,
              });
            }}
            error={!!fields.targetAmount && fields.targetAmount <= 0}
          />
          <br />
          <Form.Input
            label="Cover Image"
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
          <br />
          <Button
            fluid
            color="blue"
            loading={loading}
            disabled={loading}
            primary
            onClick={handleSubmit}
          >
            List
          </Button>
        </Form>
        <br />
        <br />
      </div>
    </div>
  );
}
