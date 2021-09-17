import React, { useState } from 'react'

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

  const personsToShow =
    persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))

  const Person = ({ person }) => {
    return <div>{person.name} {person.number}</div>
  }

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

      <div>
        filter shown with: <input value={newFilter} onChange={handleFilterChange} />
      </div>

      <br />

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <div>debug: {newName}</div>

      <ul>
        {personsToShow.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>

    </div>
  )
}

export default App