import React, { useState } from "react";
import { MdLabelOutline } from "react-icons/md";
import { BsArchive } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import {GrEdit} from "react-icons/gr"
import EditNote from "./EditNote";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";

function Notes({ noteDetails }) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {!edit ? (
        <div className={`my-x-small note ${noteDetails.color}`}>
          <span className="note_title">{noteDetails.title}</span>
          <div className="note_body">{noteDetails.description}</div>
          <div className="note_footer flex flex-jc-flex-end flex-ai-center gap-m mr-small">
            <MdLabelOutline size={25} />
            {noteDetails.archive ? (
              <BiArchiveOut size={25} />
            ) : (
              <BiArchiveIn size={25} />
            )}
            <FiTrash size={25} />
            <GrEdit
              onClick={() => setEdit((prevState) => !prevState)}
              size={25}
            />
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