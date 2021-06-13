import React from "react";
import { Menu, Button } from "semantic-ui-react";
import Link from "next/link";
import web3 from "../ethereum/web3";

const connectWallet = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
};

export default function Header() {
  return (
    <Menu style={{ marginTop: "20px" }}>
      <Link href="/">
        <a className="item">fundSME</a>
      </Link>
      <Menu.Menu position="right">
        <Button onClick={connectWallet}>
          <a className="item">Connect Wallet</a>
        </Button>
        <Link href="/companies/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
}
