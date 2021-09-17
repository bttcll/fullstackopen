import React, { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const personsName = persons.map(person => person.name)

    if (personsName.includes(newName)) {
      alertFunction()
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
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