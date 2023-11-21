import React from 'react'

const Country = ({ info }) => (
    <div>
        <h1>{info.name}</h1>
        <p>capital: {info.capital}</p>
        <p>area: {info.area}</p>
        <h3>languages:</h3>
        {info.languages ? (
            <ul>
                { Object.entries(info.languages).map( ([index, name]) => (
                        <li key={index}> {name}</li>
                ))}
            </ul> 
        ) : ( <p> </p> ) }
    </div>
)

export default Country

