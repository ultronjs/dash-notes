import React from 'react'
import Nav from '../components/Nav'
import Menu from "../components/Menu";
import "../index.css"
import AddNote from '../components/AddNote';
import NoteList from "../components/NoteList"
import SearchBar from '../components/SearchBar';

function Home() {
  return (
    <div>
      <Nav />
      <div className="main_container">
        <Menu />
        <div className='notes_container'>
          <SearchBar />
          <AddNote />
          <NoteList />
        </div>
      </div>
    </div>
  );
}

export default Home