import React, { useState } from 'react'
import { useNotes } from '../context';
import EmptyLabel from './EmptyLabel';
import Notes from './Notes';
import {groupBy} from "../utils/arrayFormatter"

function LabelsList() {
    const {notes} = useNotes()
    const labeledNotesObj = groupBy(notes, "tags")
    const labeledNotesKeys = Object.keys(labeledNotesObj);
  return (
    <div>
      <div className="note_list_heading">
        <span>Labels Notes</span>
      </div>
      {labeledNotesKeys.length > 0 ? (
        labeledNotesKeys.map((key) =>
          labeledNotesObj[key].map((element) => (
            <div className="pinned_notes_container">
              <div className="label_heading flex flex-jc-space-between">
                <span className="h4">{key}</span>
              </div>
              <div className="notes_list_container">
                <Notes noteDetails={element} />
              </div>
            </div>
          ))
        )
      ) : (
        <EmptyLabel />
      )}
    </div>
  );
}

export default LabelsList