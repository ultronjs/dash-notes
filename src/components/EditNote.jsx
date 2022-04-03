import React, { useState } from "react";
import Editor from "./Editor";
import "../index.css";
import { BsPin, BsFillPinFill } from "react-icons/bs";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { MdOutlineColorLens, MdColorLens } from "react-icons/md";
import { MdLabelOutline } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { useNotes } from "../context";
import ColorPallete from "./ColorPallete";

function EditNote({ noteDetails, setEdit }) {
  const { updateNote, addNoteToArchive } = useNotes();
  const editNoteObj = {
    _id: noteDetails._id,
    title: noteDetails.title,
    description: noteDetails.description,
    pinned: noteDetails.pinned,
    color: noteDetails.color,
    label: noteDetails.label,
    archive: noteDetails.archive,
    tags: noteDetails.tags,
  };
  console.log(noteDetails,editNoteObj);
  const [showColorPallete, setColorPallete] = useState(false);
  const [editNote, setEditNote] = useState(editNoteObj);
  const [editContent, setEditContent] = useState(noteDetails.description);
  const onChangeHandler = (e) => {
    setEditNote((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const changePinnedStatus = () => {
    setEditNote((prevState) => ({ ...prevState, pinned: !prevState.pinned }));
  };
  const changeArchiveStatus = () => {
    setEditNote((prevState) => ({ ...prevState, archive: !prevState.archive }));
  };
  console.log(editNote);
  // const{children}=parse(content).props
  // console.log(children)
  return (
    <div className="mb-x-small">
      <div className={`add_note edit_note ${editNote.color}`}>
        <input
          className="add_note_title"
          placeholder="Enter the Title"
          name="title"
          value={editNote.title}
          onChange={onChangeHandler}
        />
        {editNote.pinned ? (
          <BsFillPinFill onClick={changePinnedStatus} size={25} />
        ) : (
          <BsPin onClick={changePinnedStatus} size={25} />
        )}
        <Editor content={editContent} setContent={setEditContent} />
        <div className="add_note_footer flex flex-jc-flex-end flex-ai-center gap-m mr-small">
          {showColorPallete ? (
            <MdColorLens
              size={25}
              onClick={() => setColorPallete((prevStatus) => !prevStatus)}
            />
          ) : (
            <MdOutlineColorLens
              size={25}
              onClick={() => setColorPallete((prevStatus) => !prevStatus)}
            />
          )}
          {editNote.archive ? (
            <BiArchiveOut size={25} onClick={changeArchiveStatus} />
          ) : (
            <BiArchiveIn size={25} onClick={()=>{
              changeArchiveStatus();
              addNoteToArchive(editNote)
            }} />
          )}
          <MdLabelOutline size={25} />
          {/* <MdLabelOutline size={25} />
        <BsArchive size={25} />
        <FiTrash size={25} /> */}
          <button
            onClick={() => {
              updateNote(editNote, editContent);
              setEdit(false);
            }}
            className="btn btn_primary"
          >
            Update
          </button>
        </div>
      </div>
      {showColorPallete && <ColorPallete setNote={setEditNote} />}
    </div>
  );
}

export default EditNote;
