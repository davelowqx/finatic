import React from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { concludeFundingRound, createFundingRound } from "./Setters";

export default function ManagerForm({ address, isFinancing }) {
  const [values, setValues] = React.useState({
    targetAmount: "",
    sharesOffered: "",
    errorMessage: "",
    loading: false,
  });

  const router = useRouter();

  const handleCreate = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, errorMessage: "" });
    try {
      await createFundingRound(
        address,
        values.targetAmount,
        values.sharesOffered
      );
    } catch (err) {
      console.log(err);
      setValues({ ...values, errorMessage: err.message });
    }
    setValues({
      ...values,
      loading: false,
      sharesOffered: "",
      targetAmount: "",
    });
    //router.reload();
  };

  const handleConclude = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, errorMessage: "" });
    try {
      concludeFundingRound(address);
    } catch (err) {
      console.log(err);
      setValues({ ...values, errorMessage: err.message });
    }
    setValues({
      ...values,
      loading: false,
      sharesOffered: "",
      targetAmount: "",
    });
    //router.reload();
  };

  return (
    <>
      <Form onSubmit={handleCreate} error={!!values.errorMessage}>
        <Form.Field>
          <label>Target Amount</label>
          <Input
            value={values.targetAmount}
            onChange={(event) =>
              setValues({ ...values, targetAmount: event.target.value })
            }
            label="ETH"
            labelPosition="right"
          />
        </Form.Field>
        <Form.Field>
          <label>Shares Offered</label>
          <Input
            value={values.sharesOffered}
            onChange={(event) =>
              setValues({ ...values, sharesOffered: event.target.value })
            }
          />
        </Form.Field>

        <Message error header="Oops!" content={values.errorMessage} />
        <Button color="red" disabled={isFinancing} loading={values.loading}>
          Create Funding Round
        </Button>
      </Form>
      <Button
        color="green"
        disabled={!isFinancing}
        loading={values.loading}
        onClick={handleConclude}
      >
        Conclude Funding Round
      </Button>
    </>
  );
}
