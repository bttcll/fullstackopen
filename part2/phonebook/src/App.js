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
    return (
      <div>
        {person.name} {person.number}
        <button onClick={e => props.deletePerson(e, person.id)}>delete</button>
      </div>
    );
  }

  return (
    <ul>
      {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </ul>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="add">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [addMessage, setAddMessage] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()

    const personsName = persons.map(person => person.name)

    if (personsName.includes(newName)) {
      if (window.confirm(`'${newName}' is already added to phonebook, raplace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        const id = changedPerson.id;

        personService
          .update(id, changedPerson).then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(
              `'${person}' was already deleted from server`
            )
            setPersons(persons.filter(p => p.id !== id))
          })

        setAddMessage(
          `Updated '${newName}'`
        )
        setTimeout(() => {
          setAddMessage(null)
        }, 2000)

      }
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

      setAddMessage(
        `Added '${newName}'`
      )
      setTimeout(() => {
        setAddMessage(null)
      }, 2000)

    }

  }

  const deletePerson = (event, id) => {
    event.preventDefault()

    const personSelected = persons.find(p => p.id === id)

    if (window.confirm(`Delete '${personSelected.name}' ?`)) {
      personService
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== id))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(
            `'${personSelected}' was already deleted from server`
          )
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

      <Notification message={addMessage} />

      <Filter value={newFilter} onChange={handleFilterChange} />

      <br />

      <PersonForm onSubmit={addPerson} value={[newName, newNumber]} onChange={[handleNameChange, handleNumberChange]} />

      <h2>Numbers</h2>

      <div>debug: {newName}</div>

      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson} />

    </div>
  )
}

export default App