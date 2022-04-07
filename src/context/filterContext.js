import { createContext, useContext, useReducer, useState } from "react";
import { filterReducer } from "../reducers/filterReducer";

const FilterContext = createContext()

const FilterProvider = ({children}) => {
    const initialFilterObj = {
        sortBy:"",
        filterBy:"",
        filterByValue:[]
    }
    const[filter,filterDispatch] = useReducer(filterReducer,initialFilterObj)
    const [search, setSearch] = useState("");
    return (
      <FilterContext.Provider
        value={{ filter, filterDispatch, search, setSearch }}
      >
        {children}
      </FilterContext.Provider>
    );
}

const useFilter = () => useContext(FilterContext)

export {useFilter,FilterProvider}