import React from "react";
import { Modal, Header, Button } from "semantic-ui-react";

export default function ConnectWalletModal({ open, setOpen }) {
  const [account, setAccount] = React.useState("");
  const [connected, setConnected] = React.useState(false);

  const truncateAddress = (str) => {
    if (str.length == 42) {
      const s = str.toUpperCase();
      return `0x${s.substring(2, 6)}...${s.substring(38)}`;
    }
  };

  const handleConnect = (event) => {
    event.preventDefault();
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        setAccount(accounts[0]);
        setConnected(true);
      })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
  };

  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header
        content={
          connected
            ? "Use this account?"
            : "You have not connected your wallet!"
        }
      />
      <Modal.Content>
        <Button
          style={{ marginTop: "2" }}
          fluid
          color="green"
          onClick={handleConnect}
          disabled={connected}
        >
          {connected ? truncateAddress(account) : "CONNECT WALLET"}
        </Button>
      </Modal.Content>
    </Modal>
  );
}
