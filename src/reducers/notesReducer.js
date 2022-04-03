export const notesReducer = (notes, action) => {
  switch (action.type) {
    case "SET_DATA":
      return [...action.payload];
    case "ADD_NOTE":
      return [...notes, action.payload];
    case "REMOVE_NOTE":
      return [...notes.filter((element) => element._id !== action.payload)];
    case "UPDATE_NOTE":
      return [
        ...notes.map((element) =>element._id === action.payload._id ? action.payload : element),
      ];
    default:
      return [...notes];
  }
};
