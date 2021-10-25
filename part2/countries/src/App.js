import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = props => <div>find countries: <input value={props.value} onChange={props.onChange} /></div>

const Countries = (props) => {
  const countriesToShow =
    props.countries.filter(country => country.name.common.toUpperCase().includes(props.newFilter.toUpperCase()))

  const Country = ({ country }) => {

    const name = country.name.common;

    return (
      <div>
        {name} <button onClick={e => props.filterButton(e, name)}>show</button>
      </div>
    );
  }

  const TooMany = () => { return <div>Too many matches, specify another filter</div> }

  const Weather = (props) => {
    const [weather, setWeather] = useState({
      "current": {
        "temperature": 0,
        "weather_icons": [],
        "wind_speed": 0,
        "wind_dir": "",
      }
    })
    const api_key = process.env.REACT_APP_API_KEY
    // variable api_key has now the value set in startup

    const url_weather = `http://api.weatherstack.com/current?access_key=${api_key}&query=${props.capital}`

    useEffect(() => {
      console.log('effect')
      axios
        .get(url_weather)
        .then(response => {
          console.log('promise fulfilled')
          setWeather(response.data)
        })
    }, [url_weather])

    return (
      <div>
        <h2>Weather in {props.capital}</h2>
        <div>
          <b>temperature: </b> {weather.current.temperature}
          <br />
          <img src={weather.current.weather_icons[0]} alt="weather" width="50" height="50" />
          <br />
          <b>wind: </b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
        </div>
      </div>
    );


  }

  const SingleCoutry = ({ country }) => {

    return (
      <div>
        <h1> {country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((val, k) => <li key={k}>{val}</li>)}
        </ul>
        <img src={country.flags.svg} alt="flag" width="150" height="150" />
        <Weather capital={country.capital} />

      </div>
    )

  }

  if (countriesToShow.length > 10) return <TooMany />
  else if (countriesToShow.length === 1) return <SingleCoutry country={countriesToShow[0]} />
  else return (
    <div>
      {countriesToShow.map(country => <Country key={country.name.common} country={country} />)}
    </div>
  );

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const filterButton = (e, name) => {
    e.preventDefault();
    console.log("click")
    console.log(name)
    setFilter(name)
  }

  useEffect(() => {
    console.log('effect countries')
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
      <Countries countries={countries} newFilter={newFilter} filterButton={filterButton} />
    </div>
  )
}

export default App