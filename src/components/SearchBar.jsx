import React ,{ useState }from 'react'
import { useFilter } from '../context/filterContext';
import { GoSettings } from '../icons';
import FilterModal from './FilterModal';

function SearchBar() {
    const [showFilterModal,setShowFilterModal] = useState(false)
    const { setSearch } = useFilter();
  return (
    <>
      <div className="search_container">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="search_input"
          type="text"
          placeholder="Search"
        />
        <GoSettings
          onClick={() => setShowFilterModal((prevState) => !prevState)}
          className="filter_icon"
          size={25}
        />
      </div>
      {showFilterModal && (
        <div className={"modal_bg"}>
          <FilterModal setShowFilterModal={setShowFilterModal} />
        </div>
      )}
    </>
  );
}

export default SearchBar