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

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      });
  };
  
  useEffect(hook, []);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, 
                        number: newNumber };
    var personAlreadyAdded = false;
    persons.forEach( person => {
      if (JSON.stringify(newPerson.name.toLowerCase()) === JSON.stringify(person.name.toLowerCase())) {
        alert(`${newName} is already added to phonebook`)
        personAlreadyAdded = true;
      }
    });
    if (!personAlreadyAdded) {
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  };

  const filteredPersons = persons.filter( person =>
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

      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App