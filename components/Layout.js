import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import NavBar from "./NavBar";

export default function Layout(props) {
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"
        />
      </Head>
      <NavBar />
      {props.children}
      {/* <h1>Footer</h1> */}
    </Container>
  );
}
