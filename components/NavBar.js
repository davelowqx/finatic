import React from "react";
import { Menu, Button } from "semantic-ui-react";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";

export default function Header() {
  return (
    <Menu style={{ marginTop: "20px" }}>
      <Link href="/">
        <a className="item">fundSME</a>
      </Link>
      <Menu.Menu position="right">
        <Link href="/companies/new">
          <a className="item">List Your Company</a>
        </Link>
        <Link href="/login">
          <a className="item">Login</a>
        </Link>
        <Link href="/signup">
          <a className="item">Sign Up</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
}
