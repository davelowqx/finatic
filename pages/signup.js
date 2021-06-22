import React from "react";
import {
  Header,
  Image,
  Button,
  Grid,
  Checkbox,
  Divider,
  Message,
  Form,
} from "semantic-ui-react";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import ConnectWallet from "../components/ConnectWallet";

export default function SignUp() {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    address: "",
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();
  const handleSubmit = () => {
    //TODO: authentication logic
    router.push("/explore");
  };

  const handleGoogle = () => {
    //TODO: authentication logic
    router.push("/explore");
  };

  return (
    <Layout>
      <br />
      <div className="login-container cardborder">
        <Grid centered columns={1}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Image
                src="https://previews.dropbox.com/p/orig/ABOFglUnB0co3MIZAsQjxdb-UXaxiGNCkfbnYiLHsfTO5tFnl9z79ILZQgLc7gnIAqenGQhMJs0AeqQTJvFNcmAQByHbp_3msax_QA1V16x0kqYQTfdMIucEivw43tZDAQOmeCfmoBzhkvMWf6tOpDQbLYSMDcv2DuAn2Rlfw3zFkrmLjjZo9ISTCfRCFRXu8xaURtqGeC_R5s0XQOxo38OxpeE_6B863zyryZtuoKj0E2XuGvbp0pl_vVTaRHx7c4-pg7ZDTGp2KuA1GDezIU2vxXrSv0m-P0sCCflMUX8hWbLL6VuIARInYr3tJmZBmYiYhMmNdPheG-ydVpHbKkJx/p.svg"
                size="mini"
                centered
              />
              <Header as="h3">
                Invest in the founders you believe in or
                <br />
                <br />
                Launch a Fundraise for Your Startup Online
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={12} mobile={16}>
              <Form
                size="big"
                onSubmit={handleSubmit}
                error={!!values.errorMessage}
              >
                <Form.Input
                  label="Name"
                  placeholder="John Doe"
                  value={values.name}
                  onChange={(event) =>
                    setValues({
                      ...values,
                      name: event.target.value.substring(0, 31),
                    })
                  }
                  error={values.name.length > 30}
                />
                <Form.Input
                  label="Email"
                  placeholder="john@doe.com"
                  value={values.email}
                  onChange={(event) =>
                    setValues({
                      ...values,
                      email: event.target.value.substring(0, 31),
                    })
                  }
                />
                <Form.Input
                  label="Password"
                  placeholder="shhhh..."
                  value={values.password}
                  onChange={(event) =>
                    setValues({
                      ...values,
                      password: event.target.value,
                    })
                  }
                  error={values.password.length < 8}
                />
                <Form.Input
                  label="Ethereum Wallet Address"
                  placeholder="0x..."
                  value={values.address}
                  action="Connect"
                  onChange={(event) =>
                    setValues({
                      ...values,
                      address: event.target.value,
                    })
                  }
                />
                <br />
                <Form.Field>
                  <Checkbox
                    inline
                    label="I agree to the Terms and Conditions"
                    required
                  />
                </Form.Field>
                <Message error header="Oops!" content={values.errorMessage} />
                <br />
                <div className="login-button-container">
                  <div>
                    <Button size="big" fluid color="red">
                      GET STARTED
                    </Button>
                  </div>
                </div>
                <br />
                <Divider horizontal>Or</Divider>
                <br />
                <Button fluid size="big" color="green" onClick={handleGoogle}>
                  REGISTER WITH GOOGLE
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Layout>
  );
}
