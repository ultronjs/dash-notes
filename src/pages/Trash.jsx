import React from 'react'
import Nav from "../components/Nav";
import Menu from "../components/Menu";
import "../index.css";

function Trash() {
  return (
    <div>
      <Nav />
      <div className="main_container">
        <Menu />
      </div>
    </div>
  );
}

export default Trash