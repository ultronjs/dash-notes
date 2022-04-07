import React from 'react'
import { useFilter, useNotes } from '../context'
import TrashNotes from "./TrashNotes";
import EmptyTrash from "./EmptyTrash"
import { searchFilter } from "../utils/filter";

function TrashList() {
    const {trashNotes} = useNotes()
    const { search } = useFilter()
  return (
    <div>
      {trashNotes.length > 0? 
        searchFilter(trashNotes,search).map((element,index) => <TrashNotes key={index} noteDetails={element} />):
        <EmptyTrash />}
    </div>
  );
}

export default TrashList