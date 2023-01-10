import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: React.PropsWithChildren) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
