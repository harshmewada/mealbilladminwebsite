import React from "react";

const SearchItemSelector = ({ searchQuery, handleSearch }) => {
  return (
    <div class="form-group col-md-6">
      <input
        class="form-control"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search Item"
      />
    </div>
  );
};

export default SearchItemSelector;
