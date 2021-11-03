import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = props => <div>filter shown with: <input value={props.value} onChange={props.onChange} /></div>

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.value[0]} onChange={props.onChange[0]} />
      </div>
      <div>
        number: <input value={props.value[1]} onChange={props.onChange[1]} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {

  const personsToShow =
    props.persons.filter(person => person.name.toUpperCase().includes(props.newFilter.toUpperCase()))

  const Person = ({ person }) => {
    return <div>{person.name} {person.number}</div>
  }

  return (
    <ul>
      {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const personsName = persons.map(person => person.name)

    if (personsName.includes(newName)) {
      alertFunction()
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

    }

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const alertFunction = () => {
    window.alert(`${newName} is already added to phonebook`);
  }

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log('promise fulfilled')
      })
      .catch(error => {
        console.log('fail')
      })
  }, [])
  console.log('render', persons.length, 'notes')


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} onChange={handleFilterChange} />

      <br />

      <PersonForm onSubmit={addPerson} value={[newName, newNumber]} onChange={[handleNameChange, handleNumberChange]} />

      <h2>Numbers</h2>

      <div>debug: {newName}</div>

      <Persons persons={persons} newFilter={newFilter} />

    </div>
  )
}

export default App