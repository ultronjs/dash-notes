import React, { useState } from "react";
import { MdLabelOutline } from "react-icons/md";
import { BsArchive } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import {GrEdit} from "react-icons/gr"
import EditNote from "./EditNote";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { useNotes } from "../context";

function Notes({ noteDetails }) {
  const {
    addNoteToArchive,
    restoreNoteFromArchiveNote,
    deleteNote,
    deleteNoteFromArchiveNote,
  } = useNotes();
  const [edit, setEdit] = useState(false);
  return (
    <>
      {!edit ? (
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
              <MdLabelOutline size={25} />
              {noteDetails.archive ? (
                <BiArchiveOut
                  size={25}
                  onClick={() => {
                    restoreNoteFromArchiveNote(noteDetails);
                  }}
                />
              ) : (
                <BiArchiveIn
                  size={25}
                  onClick={() => {
                    console.log(noteDetails);
                    addNoteToArchive(noteDetails);
                  }}
                />
              )}
              {noteDetails.archive ? (
                <FiTrash
                  size={25}
                  onClick={() => deleteNoteFromArchiveNote(noteDetails)}
                />
              ) : (
                <FiTrash
                  size={25}
                  onClick={() => deleteNote(noteDetails)}
                />
              )}

              {!noteDetails.archive && (
                <GrEdit
                  onClick={() => setEdit((prevState) => !prevState)}
                  size={25}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <EditNote noteDetails={noteDetails} setEdit={setEdit} />
        </div>
      )}
    </>
  );
}

export default Notes