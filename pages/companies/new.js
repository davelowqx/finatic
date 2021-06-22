import React from "react";
import {
  Image,
  Header,
  TextArea,
  Form,
  Button,
  Checkbox,
  Message,
  Grid,
} from "semantic-ui-react";
import Layout from "../../components/layout/Layout";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";
import { CompanyProducer } from "../../ethereum/contracts";
import ProgressBar from "../../components/ProgressBar";
import db from "../../firebase/db";

export default function CompanyNew() {
  const [values, setValues] = React.useState({
    name: "",
    symbol: "",
    description: "",
    sharesOutstanding: "",
  });

  const [state, setState] = React.useState({
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();
  const handleUpload = () => {};
  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({ errorMessage: "", loading: true });
    let address = "";
    try {
      const accounts = await web3.eth.getAccounts();
      await CompanyProducer.methods
        .createCompany(values.name, values.symbol, values.sharesOutstanding)
        .send({
          from: accounts[0],
        })
        .then(
          db.collection("companies").doc("").set({
            values,
          })
        );
      setState({ ...state, loading: false });
      router.push(`/${address}`); //TODO: push to address of new campaign
    } catch (err) {
      setState({ ...state, errorMessage: err.message });
    }
  };

  return (
    <Layout>
      <br />
      <div className="login-container cardborder">
        <Grid centered>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Image
                src="https://previews.dropbox.com/p/orig/ABOFglUnB0co3MIZAsQjxdb-UXaxiGNCkfbnYiLHsfTO5tFnl9z79ILZQgLc7gnIAqenGQhMJs0AeqQTJvFNcmAQByHbp_3msax_QA1V16x0kqYQTfdMIucEivw43tZDAQOmeCfmoBzhkvMWf6tOpDQbLYSMDcv2DuAn2Rlfw3zFkrmLjjZo9ISTCfRCFRXu8xaURtqGeC_R5s0XQOxo38OxpeE_6B863zyryZtuoKj0E2XuGvbp0pl_vVTaRHx7c4-pg7ZDTGp2KuA1GDezIU2vxXrSv0m-P0sCCflMUX8hWbLL6VuIARInYr3tJmZBmYiYhMmNdPheG-ydVpHbKkJx/p.svg"
                size="mini"
                centered
              />
              <Header as="h2">List your Company!</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={12}>
              <Form size="big" error={!!values.errorMessage}>
                <Form.Input
                  label="Name"
                  placeholder="Apple Inc"
                  value={values.name}
                  onChange={(event) =>
                    setValues({
                      ...values,
                      name: event.target.value.substring(0, 31),
                    })
                  }
                  error={values.name.length > 30}
                />
                <br />
                <Form.Input
                  label="Symbol"
                  placeholder="AAPL"
                  value={values.symbol}
                  onChange={(event) =>
                    setValues({
                      ...values,
                      symbol: event.target.value.substring(0, 6).toUpperCase(),
                    })
                  }
                  error={values.symbol.length > 5}
                />
                <br />
                <Form.Field
                  control={TextArea}
                  label="Desciption"
                  placeholder="Be as specific as you want!!"
                  value={values.description}
                  onChange={(event) =>
                    setValues({
                      ...values,
                      description: event.target.value,
                    })
                  }
                />
                <br />
                <Form.Input
                  label="Shares Outstanding"
                  placeholder="1000"
                  value={values.sharesOutstanding}
                  onChange={(event) => {
                    let value = parseInt(event.target.value.substring(0, 13));
                    setValues({
                      ...values,
                      sharesOutstanding:
                        isNaN(value) || value <= 0 ? "" : value,
                    });
                  }}
                  error={values.sharesOutstanding > 1000000000000} //<1T
                />
                <br />
                <Button
                  label="Upload Image"
                  icon="upload"
                  onClick={handleUpload}
                />
                <br />
                <br />
                <br />
                <Form.Field>
                  <Checkbox label="I agree to the Terms and Conditions" />
                </Form.Field>
                <br />
                <div className="login-button-container">
                  <div className="signup-buttons">
                    <Button
                      size="big"
                      fluid
                      color="blue"
                      href="/signup"
                      loading={values.loading}
                      fluid
                      primary
                      onClick={handleSubmit}
                    >
                      {" "}
                      List
                    </Button>
                  </div>
                </div>
                <ProgressBar show={values.loading} percent={10} />
                <Message error header="Oops!" content={values.errorMessage} />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Layout>
  );
}
