import React from "react";
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.bubble.css";
import "../index.css"


function Editor({ content,setContent }) {
  return (
    <ReactQuill
      theme="bubble"
      onChange={setContent}
      value={content}
      className="notes_editor "
      modules={modules}
      formats={formats}
      placeholder="Take a Note..."
    />
  );
}
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "code",
];

export default Editor