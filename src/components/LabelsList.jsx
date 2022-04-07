import React, { useState } from 'react'
import { useFilter, useNotes } from '../context';
import EmptyLabel from './EmptyLabel';
import Notes from './Notes';
import {groupBy} from "../utils/arrayFormatter"
import { getFilteredData,searchFilter } from "../utils/filter";

function LabelsList() {
    const {notes} = useNotes()
    const labeledNotesObj = groupBy(notes, "tags")
    const labeledNotesKeys = Object.keys(labeledNotesObj);
    const {search,filter} = useFilter();
  return (
    <div>
      <div className="note_list_heading">
        <span>Labels Notes</span>
      </div>
      {labeledNotesKeys.length > 0 ? (
        labeledNotesKeys.map((key) =>
          (<div className="pinned_notes_container">
            <div className="label_heading flex flex-jc-space-between">
                <span className="h4">{key}</span>
            </div>
            {getFilteredData(filter,
            searchFilter(labeledNotesObj[key], search)
          ).map((element) => (
              <div className="notes_list_container">
                <Notes noteDetails={element} />
              </div>))}
          </div>)
          )): (
        <EmptyLabel />
      )}
    </div>
  );
}

export default LabelsList