import React from 'react'
import Nav from '../components/Nav'
import Menu from "../components/Menu";
import "../index.css"
import AddNote from '../components/AddNote';
import NoteList from "../components/NoteList"

function Home() {
  return (
    <div>
      <Nav />
      <div className="main_container">
        <Menu />
        <div className='notes_container'>
          <AddNote />
          <NoteList />
        </div>
      </div>
    </div>
  );
}

export default Home