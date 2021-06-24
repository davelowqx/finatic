import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { AuthProvider } from "../context/AuthContext";

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <Container>
        <br />
        <Head>
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"
          />
        </Head>
        <NavBar />
        {children}
        <Footer />
      </Container>
    </AuthProvider>
  );
}
