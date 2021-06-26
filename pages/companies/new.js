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
import { useRouter } from "next/router";
import { createCompany } from "../../components/Setters";

export default function CompanyNew() {
  const [fields, setFields] = React.useState({
    name: "",
    symbol: "",
    description: "",
    sharesOutstanding: "",
  });

  const [states, setStates] = React.useState({
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();
  const handleUpload = () => {};
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStates({ errorMessage: "", loading: true });
    try {
      const address = await createCompany(fields);
      setStates({ ...states, loading: false });
      router.push(`/${address}`); //TODO: push to address of new campaign
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
                <Button
                  label="Upload Image"
                  icon="upload"
                  onClick={handleUpload}
                />
                <br />
                <br />
                <br />
                <Form.Field>
                  <Checkbox label="I agree to the <a>Terms and Conditions</a>" />
                </Form.Field>
                <br />
                <div className="login-button-container">
                  <div className="login-button-container">
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
                  </div>
                </div>
                <Message error header="Error!" content={states.errorMessage} />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}
