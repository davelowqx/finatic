import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }) {
  const [width, setWidth] = React.useState(
    typeof window === "undefined" ? 768 : window.innerWidth
  );

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <Container>
      <br />
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"
        />
      </Head>
      <NavBar width={width} />
      {children}
      <br />
      <br />
      <br />
      <Footer />
    </Container>
  );
}
