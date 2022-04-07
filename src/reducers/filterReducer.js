export const filterReducer = (state,action) => {
    switch (action.type) {
      case "clear":
        return {
          ...state,
          sortBy: "",
          filterBy: "",
          filterByValue: [],
        };
      case "filterBy":
        return {
          ...state,
          filterBy: action.payload,
          filterByValue:[],
        };
      case "filterByValue":
        if(state.filterByValue.indexOf(action.payload))
        return {
          ...state,
          filterByValue:[...state.filterByValue,action.payload]}
        return {...state,filterByValue:state.filterByValue.filter(element => element!==action.payload)} 
      case "sortBy":
        return { ...state, sortBy: action.payload };
      default:
        return { ...state };
    }
}