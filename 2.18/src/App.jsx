import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/search'
import Countries from './components/countries'
import Country from './components/country'

const App = () => {

  const [countries, setCountries] = useState(null)
  const [info, setInfo] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect( () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data.map( country => country.name.common ))
      })
    }, [])

    
  const searchedCountries = () => {

    if (countries) {
      const searched = countries.filter( country => country.toLowerCase().includes( searchCountry.toLowerCase() ) )

      if (searched.length === 1) {
        const selectedCountry = searched[0]
        axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${selectedCountry}`)
        .then(response => {
          const country = { name: response.data.name.common,
                            capital: response.data.capital[0],
                            area: response.data.area,
                            languages: response.data.languages }
          setInfo(country)
        })

        return []

      } else if (searched.length > 1) {
        return searched

      } else {
        return []
      }
    } else {
      return []
    }
}

  const handleSearchChange = (event) => {
    setSearchCountry(event.target.value)
  }

  return (
    <div>
      <Search searchCountry={searchCountry} handleSearchChange={handleSearchChange} />
      { searchedCountries().length > 1 ? (
        <Countries countries={searchedCountries()} />
      ) : ( <Country info={info} /> )}
    </div>
  )

}

export default App