import React from 'react'

const Search = ({ searchCountry, handleSearchChange }) => (
    <div>
        find countries <input value={searchCountry} onChange={handleSearchChange} />
    </div> 
)

export default Search