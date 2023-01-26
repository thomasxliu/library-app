import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import { HomePage } from "./layout/HomePage/HomePage";
import { Footer } from "./layout/NavbarAndFooter/Footer";
import { Navbar } from "./layout/NavbarAndFooter/Navbar";
import { SearchBooksPage } from "./layout/SearchBookPage/SearchBooksPage";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/search">
          <SearchBooksPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
