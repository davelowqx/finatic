import React from "react";
import { Modal, Button } from "semantic-ui-react";
import { truncateAddress } from "./utils";
import { AccountContext } from "./context/AccountContext";

export default function ConnectWallet() {
  const [loading, setLoading] = React.useState(false);
  const [modal, setModal] = React.useState({ open: false, content: "" });
  const [account, setAccount] = React.useContext(AccountContext);

  // on page load, setup account listener
  React.useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      ethereum.on("accountsChanged", handleAccounts);
    }
  }, []);

  const handleAccounts = (accounts) => {
    if (accounts.length === 0) {
      setModal({
        open: true,
        content: "You do not have accounts?",
      });
    } else {
      setAccount(accounts[0]);
    }
  };

  const handleConnect = (event) => {
    event.preventDefault();
    setLoading(true);

    //check if MetaMask is installed
    if (typeof window.ethereum === "undefined") {
      setModal({
        open: true,
        content: "Please install MetaMask",
      });
      setLoading(false);
      return;
    }

    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(handleAccounts)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          setModal({
            open: true,
            content: "You have rejected the connection request",
          });
        } else {
          setModal({
            open: true,
            content: err,
          });
        }
      });

    // check chainID
    ethereum.request({ method: "eth_chainId" }).then((chainId) => {
      if (
        chainId !== (process.env.NODE_ENV !== "development" ? "0x4" : "0x539")
      ) {
        setModal({
          open: true,
          content:
            "You are connected to the wrong ethereum network! Please select Rinkeby",
        });
      }
    });
  };

  return (
    <>
      <Modal
        onClose={() => setModal({ ...modal, open: false })}
        onOpen={() => setModal({ ...modal, open: true })}
        open={modal.open}
        header="Oops!"
        content={modal.content}
        actions={[{ content: "OK", positive: true }]}
      />
      <Button
        fluid
        color="green"
        onClick={handleConnect}
        disabled={loading || !!account}
      >
        {!account ? "CONNECT WALLET" : truncateAddress(account)}
      </Button>
    </>
  );
}
