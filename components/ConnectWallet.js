import React from "react";
import { Button } from "semantic-ui-react";
import Link from "next/link";

export default function ConnectWallet() {
  const [account, setAccount] = React.useState("Connect Account");
  const [connected, setConnected] = React.useState(false);

  const truncateAddress = (str) => {
    if (str.length == 42) {
      const s = str.toUpperCase();
      return `0x${s.substring(2, 6)}...${s.substring(38)}`;
    }
  };

  const connectWallet = () => {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        setAccount(accounts[0]);
        setConnected(true);
      })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
  };

  return (
    <Button fluid size="medium" onClick={connectWallet} disabled={connected}>
      {connected ? truncateAddress(account) : "Connect Account"}
    </Button>
  );
}
