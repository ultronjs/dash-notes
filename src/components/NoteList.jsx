import React,{ useEffect, useState } from 'react'
import { useNotes } from '../context'
import Notes from './Notes'
import { BsFillPinFill, BsPin } from "react-icons/bs";

function NoteList() {
  const { notes, getNotes } = useNotes();
  useEffect(()=>{
    console.log("i m getting triggered")
    setPinnedNotes(()=>notes.filter(element=> element.pinned))
    setOtherPinnedNotes(() => 
      notes.filter((element) => !element.pinned));
  },[notes])
  console.log(notes)
  const [pinnedNotes,setPinnedNotes] = useState([])
  const [otherNotes,setOtherPinnedNotes] = useState([])
  console.log(notes,pinnedNotes,otherNotes)
  return (
    <div>
      {pinnedNotes.length > 0 && (
        <div className="pinned_notes_container">
          <div className="note_list_heading flex flex-jc-space-between">
            <span>Pinned Notes</span>
            <BsFillPinFill />
          </div>
          <div className="notes_list_container">
            {pinnedNotes.map((element) => (
              <Notes noteDetails={element} />
            ))}
          </div>
        </div>
      )}

      {otherNotes.length > 0 && (
        <div className="others_notes_container">
          <div className="note_list_heading flex flex-jc-space-between">
            <span>Other Notes</span>
            <BsPin />
          </div>
          <div className="notes_list_container">
            {otherNotes.map((element) => (
              <Notes noteDetails={element} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteList