import React from 'react'
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import ArchiveList from "../components/ArchiveList"
import "../index.css";
import SearchBar from '../components/SearchBar';

function Archive() {
  return (
    <div>
      <Nav />
      <div className="main_container">
        <Menu />
        <div className="notes_container">
          <SearchBar />
          <ArchiveList />
        </div>
      </div>
    </div>
  );
}

export default Archive