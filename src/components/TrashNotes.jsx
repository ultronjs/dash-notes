import React from 'react'
import { FaTrashRestoreAlt, FiTrash } from "../icons";
import { useNotes } from '../context';

function TrashNotes({noteDetails}) {
    const { restoreTrashNoteToActiveNotes, removeFromTrash } = useNotes();
  return (
    <>
      <div className={`my-x-small note ${noteDetails.color}`}>
        <span className="note_title">{noteDetails.title}</span>
        <div className="note_body">{noteDetails.description}</div>
        <div className="note_footer flex flex-jc-space-between flex-ai-center gap-m mr-small">
          <span>
            Created at{" "}
            {new Date(noteDetails.createdAt).getDate() +
              "/" +
              (new Date(noteDetails.createdAt).getMonth() + 1) +
              "/" +
              new Date(noteDetails.createdAt).getFullYear()}
          </span>
          <div className="flex flex-ai-center flex-jc-center gap-m">
            {noteDetails.archive ? (
              <FaTrashRestoreAlt
                size={25}
                onClick={() => restoreTrashNoteToActiveNotes(noteDetails)}
              />
            ) : (
              <FaTrashRestoreAlt
                size={25}
                onClick={() => restoreTrashNoteToActiveNotes(noteDetails)}
              />
            )}
            <FiTrash size={27} 
            onClick={() => removeFromTrash(noteDetails._id)}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrashNotes