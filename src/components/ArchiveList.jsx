import React, { useEffect, useState } from "react";
import { useNotes } from "../context";
import Notes from "./Notes";
import EmptyArchive from "./EmptyArchive";
import { BsFillPinFill, BsPin } from "react-icons/bs";

function ArchiveList() {
  const {
    archiveNotes,
    getArchiveNotes,
    restoreNoteFromArchiveNote,
    deleteNoteFromArchiveNote,
  } = useNotes();
  useEffect(() => {
    console.log("i m getting triggered");
    getArchiveNotes()
  }, []);
  console.log(archiveNotes);
  return (
    <div>
      {archiveNotes.length > 0 ? (
        <div className="pinned_notes_container">
          <div className="note_list_heading flex flex-jc-space-between">
            <span>Archive Notes</span>
          </div>
          <div className="notes_list_container">
            {archiveNotes.map((element) => {
              element.archive=true;
              return (<Notes noteDetails={element} />)}
            )}
          </div>
        </div>
      ):<EmptyArchive />}
    </div>
  );
}

export default ArchiveList