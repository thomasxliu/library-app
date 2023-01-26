import React from "react";
import "./App.css";

import { HomePage } from "./layout/HomePage/HomePage";
import { Footer } from "./layout/NavbarAndFooter/Footer";
import { Navbar } from "./layout/NavbarAndFooter/Navbar";
import { SearchBooksPage } from "./layout/SearchBookPage/SearchBooksPage";

function App() {
  return (
    <div>
      <Navbar />
      {/* <HomePage /> */}
      <SearchBooksPage />
      <Footer />
    </div>
  );
}

export default App;
