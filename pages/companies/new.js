import React from "react";
import {
  Image,
  Header,
  Input,
  TextArea,
  Form,
  Button,
  Checkbox,
  Message,
  Grid,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import { companyProducer } from "../../ethereum/contracts";
import web3 from "../../ethereum/web3";
import { storage } from "../../firebase";

export default function CompanyNew() {
  const [fields, setFields] = React.useState({
    name: "",
    symbol: "",
    description: "",
    sharesOutstanding: "",
    imageUrl: "https://via.placeholder.com/450.png",
  });

  const [image, setImage] = React.useState(null);

  const [states, setStates] = React.useState({
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStates({ errorMessage: "", loading: true });
    try {
      companyProducer.once("ListCompany", async (err, res) => {
        if (!err) {
          const companyAddress = res.returnValues.companyAddress;
          // upload image to db
          try {
            const uploadTask = storage
              .ref(`images/${companyAddress}`)
              .put(image);
            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                console.log(error);
              },
              () => {
                storage
                  .ref("images")
                  .child(companyAddress)
                  .getDownloadURL()
                  .then((imageUrl) => {
                    console.log(imageUrl);
                    setFields(...fields, imageUrl);
                  });
              }
            );
          } catch (e) {
            console.log(e);
          }

          // append image link to firestroe
          await fetch(
            `${
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : "https://fundsme.vercel.app"
            }/api/companies/new`,
            {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify({ ...fields, companyAddress }),
            }
          );
          router.push(companyAddress);
        } else {
          throw err;
        }
      });

      const accounts = await web3.eth.getAccounts();

      await companyProducer.methods
        .listCompany(fields.name, fields.symbol, fields.sharesOutstanding)
        .send({
          from: accounts[0],
        });
    } catch (err) {
      setStates({ ...states, errorMessage: err.message });
    }
  };

  return (
    <>
      <br />
      <div className="login-container cardborder">
        <Grid centered>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Image src="/static/logo.svg" size="mini" centered />
              <Header as="h2">List your Company!</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={12}>
              <Form size="big" error={!!states.errorMessage}>
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
                  label="Shares Outstanding"
                  placeholder="1000"
                  value={fields.sharesOutstanding}
                  onChange={(event) => {
                    let value = parseInt(event.target.value.substring(0, 13));
                    setFields({
                      ...fields,
                      sharesOutstanding:
                        isNaN(value) || value <= 0 ? "" : value,
                    });
                  }}
                  error={fields.sharesOutstanding > 1000000000000} //<1T
                />
                <br />
                <Form.Input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    if (event.target.files[0]) {
                      const file = event.target.files[0];
                      if (file.size < 1000000) {
                        setImage(file);
                      }
                    }
                  }}
                />
                <br />
                <Button
                  size="big"
                  fluid
                  color="blue"
                  href="/signup"
                  loading={states.loading}
                  primary
                  onClick={handleSubmit}
                >
                  {" "}
                  List
                </Button>
                <Message error header="Error!" content={states.errorMessage} />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}
