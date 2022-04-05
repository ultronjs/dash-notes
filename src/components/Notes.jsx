import React, { useState } from "react";
import {
  MdLabelOutline,
  FiTrash,
  GrEdit,
  BiArchiveIn,
  BiArchiveOut,
} from "../icons";
import EditNote from "./EditNote";
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
          <div className="note_tags_priority px-x-small py-x-small flex flex-jc-space-between">
            <div className="flex gap-s">
              <span>Tags:</span>
              {noteDetails.tags.length > 0 &&
                noteDetails.tags.map((element) => (
                  <span className="badge badge_pill badge_primary">
                    {element.label}
                  </span>
                ))}
            </div>
            <div>
              <span>Priority: </span>
              <span
                class={`badge badge_pill ${noteDetails.priority.className}`}
              >
                {noteDetails.priority.label}
              </span>
            </div>
          </div>
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
                <FiTrash size={25} onClick={() => deleteNote(noteDetails)} />
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