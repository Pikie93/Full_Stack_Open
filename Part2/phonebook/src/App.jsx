import { useState } from "react";
import Person from "./components/Person";
import SearchFilter from "./components/SearchFilter";
import AddNew from "./components/AddNew";
import DisplayPersons from "./components/DisplayPersons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearch] = useState("");

  const addContact = (event) => {
    event.preventDefault();
    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ) ||
      persons.find((person) => person.number === newNumber)
    ) {
      window.alert(`${newName} or ${newNumber} is already in the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length > 0 ? persons[persons.length - 1].id + 1 : 1,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter searchValue={searchValue} setSearch={setSearch} />

      <h2>Add New</h2>
      <AddNew
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <DisplayPersons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
