import React from 'react';

const Search = ({ searchName, handleSearchNameChange }) => (
    <div>
        filter shown with: <input
                            value={searchName}
                            onChange={handleSearchNameChange}
                            />
    </div> 
);

export default Search;