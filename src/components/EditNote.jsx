import React, { useState } from "react";
import Editor from "./Editor";
import "../index.css";
import {
  BsPin,
  BsFillPinFill,
  BiArchiveIn,
  BiArchiveOut,
  MdOutlineColorLens,
  MdColorLens,
  MdLabelOutline,
  MdLabel,
  GrPowerReset,
} from "../icons";
import { useNotes } from "../context";
import ColorPallete from "./ColorPallete";
import Select from "react-select";

function EditNote({ noteDetails, setEdit }) {
  const { updateNote, addNoteToArchive } = useNotes();
  const tagOptions = [
    { value: "Home", label: "Home" },
    { value: "Work", label: "Work" },
    { value: "Hobby", label: "Hobby" },
    { value: "Study", label: "Study" },
    { value: "Passion", label: "Passion" },
    { value: "Preparation", label: "Preparation" },
    { value: "Others", label: "Others" },
  ];
  const priorityOptions = [
    { value: "Low", label: "Low", className: "badge_success" },
    { value: "Medium", label: "Medium", className: "badge_warning" },
    { value: "High", label: "High", className: "badge_danger" },
  ];
  const editNoteObj = {
    _id: noteDetails._id,
    title: noteDetails.title,
    description: noteDetails.description,
    pinned: noteDetails.pinned,
    color: noteDetails.color,
    archive: noteDetails.archive,
    tags: noteDetails.tags,
    priority: noteDetails.priority,
    createdAt: noteDetails.createdAt,
  };
  const [showColorPallete, setColorPallete] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
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
  const changePriorityStatus = (e) => {
    setEditNote((prevState) => ({ ...prevState, priority: e }));
  };
  const changeLabel = (e) => {
    setEditNote((prevState) => ({
      ...prevState,
      tags:e
    }));
  };
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
        <div className="add_note_footer flex flex-jc-space-between">
          <div className="flex flex-ai-center gap-m mr-small ml-x-small">
            <span>Priority:</span>
            <Select
              defaultValue={noteDetails.priority}
              name="priority"
              options={priorityOptions}
              className="basic-select"
              classNamePrefix="select"
              onChange={changePriorityStatus}
            />
          </div>
          <div className="flex flex-ai-center gap-m mr-small">
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
            {showLabel ? (
              <>
                <MdLabel
                  size={25}
                  onClick={() => setShowLabel((prevState) => !prevState)}
                />
                <Select
                  isMulti
                  defaultValue={noteDetails.tags.map(element=>element)}
                  name="tags"
                  options={tagOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={changeLabel}
                />
                {/* <select className="selection_menu" onChange={changeLabel}>
                  <option className="selection_menu_option" value="Orange">
                    Orange
                  </option>
                  <option className="selection_menu_option" value="Radish">
                    Radish
                  </option>
                  <option className="selection_menu_option" value="Cherry">
                    Cherry
                  </option>
                </select> */}
              </>
            ) : (
              <MdLabelOutline
                size={25}
                onClick={() => setShowLabel((prevState) => !prevState)}
              />
            )}
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
      </div>
      {showColorPallete && <ColorPallete setNote={setEditNote} />}
    </div>
  );
}

export default EditNote;
