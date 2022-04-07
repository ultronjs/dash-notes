import React,{ useEffect, useState } from 'react'
import { useFilter, useNotes } from '../context'
import Notes from './Notes'
import { BsFillPinFill, BsPin } from "../icons"
import { getFilteredData,searchFilter } from "../utils/filter";

function NoteList() {
  const { notes, getNotes } = useNotes();
  const {filter,search} = useFilter()
  const [filteredNotes, setFilteredNotes] = useState([]);
  useEffect(()=>{
    getNotes();
  },[])
  useEffect(()=>{
      setPinnedNotes(() =>
        getFilteredData(filter, notes).filter((element) => element.pinned)
      );
      setOtherPinnedNotes(() =>
        getFilteredData(filter, notes).filter((element) => !element.pinned)
      );
  },[notes,filter])
  const [pinnedNotes,setPinnedNotes] = useState([])
  const [otherNotes,setOtherPinnedNotes] = useState([])

  console.log(filteredNotes)
  console.log(notes)
  return (
    <div>
      {pinnedNotes.length > 0 && (
        <div className="pinned_notes_container">
          <div className="note_list_heading flex flex-jc-space-between">
            <span>Pinned Notes</span>
            <BsFillPinFill />
          </div>
          <div className="notes_list_container">
            {searchFilter(pinnedNotes, search).map((element) => (
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
            {searchFilter(otherNotes, search).map((element) => (
              <Notes noteDetails={element} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteList