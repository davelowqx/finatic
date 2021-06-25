import React from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import web3 from "../ethereum/web3";
import { Company } from "../ethereum/contracts";
import { db } from "../firebase";

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
      const company = Company(address);
      const accounts = await web3.eth.getAccounts();
      await company.methods
        .createFundingRound(
          web3.utils.toWei(values.targetAmount, "ether"),
          values.sharesOffered
        )
        .send({
          from: accounts[0],
        });

      await db.collection("companies").doc(address).set(
        {
          isFinancing: true,
          currentAmount: 0,
          targetAmount: values.targetAmount,
          sharesOffered: values.sharesOffered,
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
      setValues({ ...values, errorMessage: err.message });
    }

    // reset state back to normal
    setValues({ ...values, loading: false, targetAmount: "" });
    //router.reload();
  };

  const handleConclude = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, errorMessage: "" });
    try {
      const company = Company(address);
      const accounts = await web3.eth.getAccounts();
      await company.methods.concludeFundingRound().send({
        from: accounts[0],
      });
    } catch (err) {
      console.log(err);
      setValues({ ...values, errorMessage: err.message });
    }

    // reset state back to normal
    setValues({ ...values, loading: false, targetAmount: "" });
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
