import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="content container mt-4">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
