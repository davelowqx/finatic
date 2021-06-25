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
    <div>
      <br />
      <div className="login-container cardborder">
        <Grid centered columns={1}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Image src="/static/logo.svg" size="mini" centered />
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
    </div>
  );
}
