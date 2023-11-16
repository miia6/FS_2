import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/search';
import PersonForm from './components/personform';
import Persons from './components/persons';

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const hook = () => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      });
  };
  
  useEffect(hook, []);

  const addPerson = (event) => {

    event.preventDefault();
    const newPerson = { name: newName, 
                        number: newNumber };
    var personAlreadyAdded = false;

    persons.forEach( person => {
      if (JSON.stringify(newPerson.name.toLowerCase()) === JSON.stringify(person.name.toLowerCase())) {
        //alert(`${newName} is already added to phonebook`)
        personAlreadyAdded = true;
      }
    });

    if (!personAlreadyAdded) {
      axios
      .post('http://localhost:3001/persons', newPerson)
      .then( response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      });
    } else {
      const personToChange = persons.find( person => person.name.toLowerCase() === newPerson.name.toLowerCase() );
      const confirmNumberChange = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

      if (confirmNumberChange) {
        const url = `http://localhost:3001/persons/${personToChange.id}`;
        axios
          .put(url, newPerson)
          .then( response => {
              setPersons( persons.map( person => person.id !== personToChange.id ? person : response.data ))
          })
            setNewName('');
            setNewNumber('');
      }
    }

  };

  const deletePerson = (id) => {
    const personToDelete = persons.find( person => person.id === id );
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`);

    if (confirmDelete) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then( setPersons(persons.filter( (person) => person.id !== id)) )
    }
};

  const filteredPersons = 
    persons.filter( person =>
      person.name.toLowerCase().includes(searchName.toLowerCase()) );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Search searchName={searchName} handleSearchNameChange={handleSearchNameChange} />

      <PersonForm newName={newName} 
                  newNumber={newNumber} 
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange} 
                  addPerson={addPerson} />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App