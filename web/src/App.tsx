import React from "react";
import "./App.css";
import { Carousel } from "./layout/HomePage/Carousel";
import { ExploreTopBooks } from "./layout/HomePage/ExploreTopBooks";
import { Navbar } from "./layout/NavbarAndFooter/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
    </div>
  );
}

export default App;
