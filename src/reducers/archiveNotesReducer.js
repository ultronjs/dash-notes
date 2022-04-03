export const archiveNotesReducer = (archiveNotes, action) => {
  switch (action.type) {
    case "SET_ARCHIVE_DATA":
      return [...action.payload];
    case "ADD_ARCHIVE_NOTE":
      return [...archiveNotes, action.payload];
    case "DELETE_ARCHIVE_NOTE":
      return [
        ...archiveNotes.filter((element) => element._id !== action.payload),
      ];
    default:
      return [...archiveNotes];
  }
};
