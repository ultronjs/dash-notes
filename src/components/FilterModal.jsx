import React, { useState } from 'react'
import Select from "react-select"
import { useFilter } from '../context/filterContext';
import {sortByOptions,filterOptions,tagOptions,priorityOptions} from "../utils/selectMenuOptions"

function FilterModal({ setShowFilterModal }) {
  const { filter, filterDispatch } = useFilter();
  const [showLabelOrPriority, setShowLabelOrPriority] = useState(filter.filterBy.label);
  return (
    <>
      <div class="modal">
        <div class="modal_header h4">
          <span>Sort & Filter</span>
          <i
            onClick={() => setShowFilterModal(false)}
            class="far fa-times-circle modal_dismiss"
          ></i>
        </div>
        <div class="modal_body">
          <div className="flex flex-col">
            <span className="h4">Sort By</span>
            <Select
              name="sortBy"
              defaultValue={filter.sortBy}
              value={filter.sortBy}
              options={sortByOptions}
              className="basic-select"
              classNamePrefix="select"
              onChange={(e) => filterDispatch({ type: "sortBy", payload: e })}
            />
          </div>
          <div className="flex flex-col">
            <span className="h4">Filter By</span>
            <Select
              defaultValue={filter.filterBy}
              value={filter.filterBy}
              name="filterBy"
              options={filterOptions}
              className="basic-select"
              classNamePrefix="select"
              onChange={(e) => {
                setShowLabelOrPriority(e.value);
                filterDispatch({ type: "filterBy", payload: e });
              }}
            />
            {
              {
                "Labels/Tags": tagOptions.map((element) => (
                  <span>
                    <input
                      type="checkbox"
                      name={element.label}
                      value={element.value}
                      checked={
                        filter.filterByValue.indexOf(element.label) === -1
                          ? false
                          : true
                      }
                      onClick={(e) =>
                        filterDispatch({
                          type: "filterByValue",
                          payload: e.target.value,
                        })
                      }
                    />
                    {element.label}
                  </span>
                )),
                Priority: priorityOptions.map((element) => (
                  <span>
                    <input
                      type="checkbox"
                      name={element.label}
                      value={element.value}
                      checked={
                        filter.filterByValue.indexOf(element.label) === -1
                          ? false
                          : true
                      }
                      onChange={(e) =>
                        filterDispatch({
                          type: "filterByValue",
                          payload: e.target.value,
                        })
                      }
                    />
                    {element.label}
                  </span>
                )),
              }[showLabelOrPriority]
            }
          </div>
        </div>
        <div class="modal_footer">
          {/* <button
            onClick={() => setShowFilterModal(false)}
            class="btn btn_dark modal_cancel_btn"
          >
            Cancel
          </button> */}
          <button
            onClick={() => {
              filterDispatch({ type: "clear" });
              setShowLabelOrPriority("");
            }}
            class="btn btn_secondary modal_save_btn"
          >
            Clear Changes
          </button>
        </div>
      </div>
    </>
  );
}

export default FilterModal