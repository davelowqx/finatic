import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"
        />
      </Head>
      <div style={{ maxWidth: "1024px", margin: "auto" }}>
        <div className="container">
          <NavBar />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
