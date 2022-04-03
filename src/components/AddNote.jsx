import React, { useState } from "react";
import Editor from './Editor'
import "../index.css"
import { BsPin, BsFillPinFill } from "react-icons/bs";
import { MdOutlineColorLens, MdColorLens } from "react-icons/md";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import {GrPowerReset} from "react-icons/gr"
import {MdLabelOutline} from "react-icons/md"
import { useNotes } from "../context";
import ColorPallete from "./ColorPallete"
function AddNote() {
  const noteInitialObj = {
    title: "",
    description: "",
    pinned: false,
    color: "",
    label: "",
    archive:false,
    tags:[],
  };
  const [showColorPallete,setColorPallete] = useState(false)
  const {postNote} = useNotes()
  const [note,setNote] = useState(noteInitialObj)
  const [content,setContent] = useState("")
  const onChangeHandler = (e) => {
    setNote((prevState) => ({...prevState,[e.target.name]:e.target.value}))
  }
  const changePinnedStatus = () => {
    setNote((prevState)=>({...prevState,pinned:!prevState.pinned}))
  }
  const changeArchiveStatus = () => {
    setNote((prevState) => ({ ...prevState, archive: !prevState.archive }));
  };
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
          <GrPowerReset size={25} onClick={()=> {
            setNote(noteInitialObj)
            setContent("")
          }} />
          {/* {note.archive ? (
            <BiArchiveOut size={25} onClick={changeArchiveStatus} />
          ) : (
            <BiArchiveIn size={25} onClick={changeArchiveStatus} />
          )} */}
          <MdLabelOutline size={25} />
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
      {showColorPallete && <ColorPallete setNote={setNote} />}
    </>
  );
}

export default AddNote