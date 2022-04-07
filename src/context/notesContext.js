import { createContext, useContext, useReducer,useState } from "react"
import { privateInstance } from "../utils/axios";
import { notesReducer, archiveNotesReducer } from "../reducers";
import { useToast } from "./toastContext";
import parse from "html-react-parser";

const NotesContext = createContext()


const NotesProvider = ({children}) => {
    const { addToast } = useToast();
    const getNotes = async () => {
      try {
        const { status, data } = await privateInstance.get("/notes");
        if (status === 200)
          notesDispatch({ type: "SET_DATA", payload: data.notes });
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Fetch Data from API",
        });
        console.error(error);
      }
    };

    const postNote = async (notes,content) => {
      if(content !==""){
        var note = {...notes,description:parse(content).props.children}}
      else{
        var note = {...notes}
      }
      try {
        const { status, data } = await privateInstance({
          method: "post",
          url: "/notes",
          data: {
            note
          },
        });
        if (status === 201) {
          notesDispatch({ type: "SET_DATA", payload: data.notes });
          return {status,data};
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Add Note",
        });
        console.error(error);
      }
    };

    const deleteNote = async (note) => {
      try {
        const { status, data } = await privateInstance({
          method: "delete",
          url: `/notes/${note._id}`,
        });
        if (status === 200) {
          notesDispatch({ type: "SET_DATA", payload: data.notes });
          setTrashNotes((prevState) => prevState.concat(note))
          return data.notes;
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Delete Note",
        });
        console.error(error);
      }
    };

    const updateNote = async (notes, content) => {
      const note = {
        ...notes,
        description: parse(content).props.children
      };
      try {
        const { status, data } = await privateInstance({
          method: "post",
          url: `/notes/${note._id}`,
          data:{
            note
          },
        });
        if (status === 201) {
          notesDispatch({ type: "SET_DATA", payload: data.notes });
          return data.notes;
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Update Note",
        });
        console.error(error);
      }
    };

    const getArchiveNotes = async () => {
      try {
        const { status, data } = await privateInstance.get("/archives");
        if (status === 200)
          archiveNotesDispatch({
            type: "SET_ARCHIVE_DATA",
            payload: data.archives,
          });
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Fetch Data from API",
        });
        console.error(error);
      }
    };

    const addNoteToArchive = async (note) => {
      try {
        const { status, data } = await privateInstance({
          method: "post",
          url: `/notes/archives/${note._id}`,
          data: {
            note,
          },
        });
        if (status === 201) {
          archiveNotesDispatch({ type: "ADD_ARCHIVE_NOTE", payload: note });
          notesDispatch({ type: "SET_DATA", payload: data.notes });
          return {status,data};
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Add Note to Archive",
        });
        console.error(error);
      }
    };   
    const restoreNoteFromArchiveNote = async (note) => {
      try {
        const { status, data } = await privateInstance({
          method: "post",
          url: `/archives/restore/${note._id}`,
          data: {},
        });
        if (status === 200) {
          archiveNotesDispatch({
            type: "SET_ARCHIVE_DATA",
            payload: data.archives,
          })
          notesDispatch({ type: "SET_DATA", payload: data.notes });
          return data;
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Restore Note from Archive",
        });
        console.error(error);
      }

    }
    const deleteNoteFromArchiveNote = async (note) => {
      // archiveNotesDispatch({ type: "DELETE_ARCHIVE_NOTE", payload: note });
      try {
        const { status, data } = await privateInstance({
          method: "delete",
          url: `/archives/delete/${note._id}`,
        });
        if (status === 200) {
          setTrashNotes((prevState) => prevState.concat(note));
          archiveNotesDispatch({
            type: "SET_ARCHIVE_DATA",
            payload: data.archives,
          });
          return data;
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Delete Note from Archive",
        });
        console.error(error);
      }
    };
    const restoreTrashNoteToActiveNotes = async (note) => {
      note.archive =false
      try {
        const { status, data } = await privateInstance({
          method: "post",
          url: "/notes",
          data: {
            note
          },
        });
        if (status === 201) {
          notesDispatch({ type: "SET_DATA", payload: data.notes });
          setTrashNotes((prevState) =>
          prevState.filter((element) => element._id !== note._id)
        );
          return {status,data};
        }
      } catch (error) {
        addToast({
          type: "Error",
          msg: "Unable to Add Note",
        });
        console.error(error);
      }
    }
    const removeFromTrash = async (id) => {
      setTrashNotes((prevState) =>
          prevState.filter((element) => element._id !== id))

    }

    const [notes, notesDispatch] = useReducer(notesReducer, []);
    const [archiveNotes,archiveNotesDispatch] = useReducer(archiveNotesReducer,[])
    const [trashNotes,setTrashNotes] = useState([])
    return (
      <NotesContext.Provider
        value={{
          notes,
          getNotes,
          postNote,
          deleteNote,
          updateNote,
          archiveNotes,
          getArchiveNotes,
          addNoteToArchive,
          restoreNoteFromArchiveNote,
          deleteNoteFromArchiveNote,
          trashNotes,
          setTrashNotes,
          restoreTrashNoteToActiveNotes,
          removeFromTrash,
        }}
      >
        {children}
      </NotesContext.Provider>
    );
}

const useNotes = () => useContext(NotesContext)
export {NotesProvider,useNotes}