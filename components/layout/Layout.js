import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <Container>
      <br />
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"
        />
      </Head>
      <NavBar />
      {props.children}
      <br />
      <br />
      <br />
      <Footer />
    </Container>
  );
}
