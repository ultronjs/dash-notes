import React, { useState } from "react";
import Editor from './Editor'
import "../index.css"
import { BsPin, BsFillPinFill } from "react-icons/bs";
import { MdOutlineColorLens, MdColorLens } from "react-icons/md";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import {GrPowerReset} from "react-icons/gr"
import { MdLabelOutline, MdLabel } from "react-icons/md";
import { useNotes } from "../context";
import ColorPallete from "./ColorPallete"
import Select from "react-select";
function AddNote() {
  const tagOptions = [
    { value: "Home", label: "Home" },
    { value: "Work", label: "Work"},
    { value: "Hobby", label: "Hobby"},
    { value: "Study", label: "Study"},
    { value: "Passion", label: "Passion"  },
    { value: "Preparation", label: "Preparation" },
    { value: "Others", label: "Others"  }
  ];
  const priorityOptions = [
    { value: "Low", label: "Low", className: "badge_success" },
    { value: "Medium", label: "Medium", className: "badge_warning" },
    { value: "High", label: "High", className: "badge_danger" },
  ];
  const noteInitialObj = {
    title: "",
    description: "",
    pinned: false,
    color: "",
    archive: false,
    tags: [],
    priority: { value: "Low", label: "Low", className: "badge_success" },
    createdAt: new Date(),
  };
  const [showColorPallete,setColorPallete] = useState(false)
  const [showLabel,setShowLabel] = useState(false)
  const {postNote} = useNotes()
  const [note,setNote] = useState(noteInitialObj)
  const [content,setContent] = useState("")
  const onChangeHandler = (e) => {
    setNote((prevState) => ({...prevState,[e.target.name]:e.target.value}))
  }
  const changePinnedStatus = () => {
    setNote((prevState)=>({...prevState,pinned:!prevState.pinned}))
  }
  const changePriorityStatus = (e) => {
    setNote((prevState) => ({ ...prevState, priority: e }));
  };
  const changeLabel = (e) => {
    console.log(e)
    setNote((prevState) => ({
      ...prevState,
      tags: e,
    }));
  }
  console.log(note)
  // const{children}=parse(content).props
  // console.log(children)
  return (
    <>
      <div className={`add_note ${note.color}`}>
        <input
          className="add_note_title"
          placeholder="Enter the Title"
          name="title"
          value={note.title}
          onChange={onChangeHandler}
        />
        {note.pinned ? (
          <BsFillPinFill onClick={changePinnedStatus} size={25} />
        ) : (
          <BsPin onClick={changePinnedStatus} size={25} />
        )}
        <Editor content={content} setContent={setContent} />
        <div className="add_note_footer flex flex-jc-space-between">
          <div className="flex flex-ai-center gap-m mr-small ml-x-small">
            <span>Priority:</span>
            <Select
              defaultValue={noteInitialObj.priority}
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
            <GrPowerReset
              size={25}
              onClick={() => {
                setNote(noteInitialObj);
                setContent("");
              }}
            />
            {showLabel ? (
              <>
                <MdLabel
                  size={25}
                  onClick={() => setShowLabel((prevState) => !prevState)}
                />
                <Select
                  defaultValue={noteInitialObj.tags}
                  isMulti
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
                postNote(note, content);
                setNote(noteInitialObj);
                setContent("");
              }}
              className="btn btn_primary"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      {showColorPallete && <ColorPallete setNote={setNote} />}
    </>
  );
}

export default AddNote