import React from "react";
import { Image, Header, TextArea, Form, Button, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CampaignProducer } from "../ethereum/contracts";
import web3 from "../ethereum/web3";
import { storage } from "../firebase";
import { ModalContext } from "../components/context/ModalContext";
import { AccountContext } from "../components/context/AccountContext";
// import { listCampaign } from "../../components/Setters";

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

  const putData = (imageUrl, campaignAddress) => {
    fetch(`/api/companies/new`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        ...fields,
        imageUrl,
        campaignAddress,
      }),
    }).then(() => {
      router.push(campaignAddress);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!account) {
      popup("Please connect wallet first");
      return;
    }
    setLoading(true);
    /*
    try {
      await listCampaign({ ...fields, image });
    } catch (err) {
      console.log(err);
      setStates({ errorMessage: err, ...states });
    } finally {
      setStates({ errorMessage: "", loading: false });
    }
    */
    try {
      const accounts = await web3.eth.getAccounts();

      await CampaignProducer.methods
        .listCampaign(fields.name, fields.symbol, fields.targetAmount)
        .send({
          from: accounts[0],
        })
        .on("receipt", (receipt) => {
          const CampaignAddress =
            receipt.events.ListCampaign.returnValues.CampaignAddress;
          console.log(CampaignAddress);
          try {
            const uploadTask = storage
              .ref()
              .child(`images/${CampaignAddress}`)
              .put(image);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                console.log(snapshot);
              },
              (err) => {
                popup(err.message);
                putData("https://via/placeholder.com/450.png", CampaignAddress);
              },
              () => {
                // success
                uploadTask.snapshot.ref.getDownloadURL().then((imageUrl) => {
                  putData(imageUrl, CampaignAddress);
                });
              }
            );
          } catch (err) {
            popup(err.message);
          }
        });
    } catch (err) {
      popup(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container cardborder">
        <Image src="/logo.svg" size="mini" centered />
        <Header as="h2" textAlign="center">
          List your Campaign!
        </Header>
        <Form>
          <Form.Input
            label="Name"
            placeholder="Apple Inc"
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
            placeholder="AAPL"
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
            placeholder="Be as specific as you want!!"
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
            placeholder="1000"
            type="number"
            value={fields.targetAmount}
            onChange={(event) => {
              setFields({
                ...fields,
                targetAmount: event.target.value,
              });
            }}
            error={fields.targetAmount > 1000000000000} //<1T
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
            {" "}
            List
          </Button>
        </Form>
      </div>
    </>
  );
}
