import React from 'react'
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import ArchiveList from "../components/ArchiveList"
import "../index.css";

function Archive() {
  return (
    <div>
      <Nav />
      <div className="main_container">
        <Menu />
        <ArchiveList />
      </div>
    </div>
  );
}

export default Archive