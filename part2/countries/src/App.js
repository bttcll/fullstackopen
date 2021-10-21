import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = props => <div>find countries: <input value={props.value} onChange={props.onChange} /></div>

const Countries = (props) => {
  const countriesToShow =
    props.countries.filter(country => country.name.common.toUpperCase().includes(props.newFilter.toUpperCase()))

  const Country = ({ country }) => {
    return <div>{country.name.common}</div>
  }

  const TooMany = () => { return <div>Too many matches, specify another filter</div> }

  const SingleCoutry = ({ country }) => {
    return (
      <div>
        <h1> {country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((val, k) => <li k={k}>{val}</li>)}
        </ul>
        <img src={country.flags.svg} alt="flag" width="150" height="150" />
      </div>
    )

  }

  if (countriesToShow.length > 10) return <TooMany />
  else if (countriesToShow.length === 1) return <SingleCoutry country={countriesToShow[0]} />
  else return (<div>{countriesToShow.map(country => <Country key={country.name.common} country={country} />)}</div>)

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'notes')


  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <br />
      <Countries countries={countries} newFilter={newFilter} />
    </div>
  )
}

export default App