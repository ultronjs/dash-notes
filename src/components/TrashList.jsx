import React from 'react'
import { useNotes } from '../context'
import TrashNotes from "./TrashNotes";
import EmptyTrash from "./EmptyTrash"

function TrashList() {
    const {trashNotes,setTrashNotes} = useNotes()
    console.log(trashNotes)
  return (
    <div>
      {trashNotes.length > 0? 
        trashNotes.map((element,index) => <TrashNotes key={index} noteDetails={element} />):
        <EmptyTrash />}
    </div>
  );
}

export default TrashList