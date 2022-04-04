import React from 'react'
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import "../index.css";
import TrashList from '../components/TrashList';
import SearchBar from '../components/SearchBar';

function Trash() {
  return (
    <div>
      <Nav />
      <div className="main_container">
        <Menu />
        <div className="notes_container">
          <SearchBar />
          <TrashList />
        </div>
      </div>
    </div>
  );
}

export default Trash