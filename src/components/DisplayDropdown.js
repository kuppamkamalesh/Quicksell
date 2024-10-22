// src/components/DisplayDropdown.js

import React, { useState, useEffect } from "react";
import { LuSettings2 } from "react-icons/lu";
import "../styles/Bajaj.css";

const DisplayDropdown = ({
  onGroupChange,
  onOrderChange,
  groupBy,
  orderBy,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".dropdown")) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="dropdown">
      <button
        className="dropdown-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <LuSettings2 />
        Display
        <img src="icons_FEtask/down.svg" alt="down" />
      </button>
      {showDropdown && (
        <div className="dropdown-content">
          <div className="options-container">
            <div className="option-group">
              <label>Grouping</label>
              <select
                value={groupBy}
                onChange={(e) => onGroupChange(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="userId">User ID</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="option-group">
              <label>Ordering</label>
              <select
                value={orderBy}
                onChange={(e) => onOrderChange(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayDropdown;
