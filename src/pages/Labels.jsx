import React from 'react'
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import LabelsList from "../components/LabelsList"
import SearchBar from '../components/SearchBar';
import "../index.css";

function Labels() {
  return (
    <div>
      <Nav />
      <div className="main_container">
        <Menu />
        <div className="notes_container">
          <SearchBar />
          <LabelsList />
        </div>
      </div>
    </div>
  );
}

export default Labels