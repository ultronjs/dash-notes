import { createContext, useContext, useReducer } from "react"
import { privateInstance } from "../utils/axios";
import { notesReducer, archiveNotesReducer } from "../reducers";
import { useToast } from "./toastContext";
import { v4 as uuid } from "uuid";
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
      console.log(notes)
      const note = {...notes,description:parse(content).props.children,_id:uuid()}
      console.log(note)
      notesDispatch({ type: "ADD_NOTE", payload: note });
      // try {
      //   const { status, data } = await privateInstance({
      //     method: "post",
      //     url: "/notes",
      //     data: {
      //       note
      //     },
      //   });
      //   if (status === 201) {
      //     notesDispatch({ type: "ADD_NOTE", payload: note });
      //     return data.notes;
      //   }
      // } catch (error) {
      //   addToast({
      //     type: "Error",
      //     msg: "Unable to Add Note",
      //   });
      //   console.error(error);
      // }
    };
    const deleteNote = async (id) => {
      try {
        const { status, data } = await privateInstance({
          method: "delete",
          url: `/notes/${id}`,
        });
        if (status === 200) {
          notesDispatch({ type: "REMOVE_NOTE", payload: id });
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
      console.log(note)
      notesDispatch({ type: "UPDATE_NOTE", payload:note});
      // try {
      //   const { status, data } = await privateInstance({
      //     method: "post",
      //     url: `/notes/${id}`,
      //   });
      //   if (status === 200) {
      //     notesDispatch({ type: "UPDATE_NOTE", payload: id });
      //     return data.notes;
      //   }
      // } catch (error) {
      //   addToast({
      //     type: "Error",
      //     msg: "Unable to Update Note",
      //   });
      //   console.error(error);
      // }
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
      console.log(note);
      notesDispatch({ type: "ADD_NOTE", payload: note });
      archiveNotesDispatch({ type: "REMOVE_NOTE", payload: note._id });
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
          return data;
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
      archiveNotesDispatch({ type: "DELETE_ARCHIVE_NOTE", payload: note._id });
      notesDispatch({ type: "ADD_NOTE", payload: note });
      try {
        const { status, data } = await privateInstance({
          method: "post",
          url: `/notes/archives/restore/${note._id}`,
          data: {},
        });
        if (status === 201) {
          archiveNotesDispatch({ type: "DELETE_ARCHIVE_NOTE", payload: note });
          notesDispatch({ type: "ADD_NOTE", payload: note });
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
      archiveNotesDispatch({ type: "DELETE_ARCHIVE_NOTE", payload: note });
      try {
        const { status, data } = await privateInstance({
          method: "delete",
          url: `/notes/archives/delete/${note._id}`,
        });
        if (status === 201) {
          archiveNotesDispatch({ type: "DELETE_ARCHIVE_NOTE", payload: note });
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

    const [notes, notesDispatch] = useReducer(notesReducer, []);
    const [archiveNotes,archiveNotesDispatch] = useReducer(archiveNotesReducer,[])
    return(
        <NotesContext.Provider 
            value= {{
                notes,
                getNotes,
                postNote,
                deleteNote,
                updateNote,
                archiveNotes,
                getArchiveNotes,
                addNoteToArchive,
                restoreNoteFromArchiveNote,
                deleteNoteFromArchiveNote
            }}>
            {children}
        </NotesContext.Provider>
    )
}

const useNotes = () => useContext(NotesContext)
export {NotesProvider,useNotes}