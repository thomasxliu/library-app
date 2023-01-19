import React from 'react';
import './App.css';
import { ExploreTopBooks } from './layout/HomePage/ExploreTopBooks';
import { Navbar } from './layout/NavbarAndFooter/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <ExploreTopBooks />
    </div>
  );
}

export default App;
