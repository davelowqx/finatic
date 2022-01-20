import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
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
