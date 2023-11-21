import React from 'react'

const Countries = ({ countries }) => (
    <div>
        { countries.length <= 10 && countries.length > 1 ? (
            <ul>
                { countries.map( (country, index) => (
                    <p key={index}> {country} </p>
                ))}
            </ul>
        ) : countries.length > 10 && countries.length < 250 ? ( 
            <p> Too many matches, specify another filter </p> 
        ) : <p> </p> 
        }
    </div>
)

export default Countries