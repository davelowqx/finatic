import React from "react";
import { Menu, Button } from "semantic-ui-react";
import Link from "next/link";

export default function Header() {
  const [connected, setConnected] = React.useState(false);

  const connectWallet = () => {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then(setConnected(true))
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
    <Menu style={{ marginTop: "20px" }}>
      <Link href="/">
        <a className="item">fundSME</a>
      </Link>
      <Menu.Menu position="right">
        <Button onClick={connectWallet} disabled={connected}>
          <a className="item">Connect Wallet</a>
        </Button>
        <Link href="/companies/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
}
