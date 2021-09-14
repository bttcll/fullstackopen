import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const Person = (props) => {
    return <div>{props.name}</div>
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personsName = persons.map(person => person.name)

    if (personsName.includes(newName)) {
      alertFunction()
    } else {
      const person = {
        name: newName,
      }
      setPersons(persons.concat(person))
      setNewName('')
    }

  }

  const alertFunction = () => {
    window.alert(`${newName} is already added to phonebook`);
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <div>debug: {newName}</div>

      <ul>
        {persons.map(person =>
          <Person name={person.name} />
        )}
      </ul>

    </div>
  )
}

export default App