import "../styles/globals.css";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <main className="min-h-[70vh] container mx-auto px-4 py-6">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
export default MyApp;
