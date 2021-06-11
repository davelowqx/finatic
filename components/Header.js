import React from "react";
import { Menu } from "semantic-ui-react";
// link render anchor tags around react components
import Link from "next/link";
//import { Link } from "../routes";

export default function Header() {
  return (
    <Menu style={{ marginTop: "20px" }}>
      <Link href="/">
        <a className="item">finatic</a>
      </Link>
      <Menu.Menu position="right">
        <Link href="/">
          <a className="item">Companies</a>
        </Link>
        <Link href="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
}
