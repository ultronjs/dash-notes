import React ,{ useState }from 'react'
import {GoSettings} from "react-icons/go"
import FilterModal from './FilterModal';

function SearchBar() {
    const [showFilterModal,setShowFilterModal] = useState(false)
    console.log(showFilterModal)
  return (
    <>
      <div className="search_container">
        <input className="search_input" type="text " placeholder="Search" />
        <GoSettings
          onClick={()=> setShowFilterModal((prevState)=>!prevState)}
          className="filter_icon"
          size={25}
        />
      </div>
      {showFilterModal && <FilterModal />}
    </>
  );
}

export default SearchBar