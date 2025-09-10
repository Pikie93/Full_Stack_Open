import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import AddNew from "./components/AddNew";
import DisplayPersons from "./components/DisplayPersons";
import personsService from "./services/personsService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearch] = useState("");

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      if (existingPerson.number !== newNumber) {
        if (
          window.confirm(
            `${newName} is already in the phonebook, replace the old number with the new one?`
          )
        ) {
          const updatedPerson = { ...existingPerson, number: newNumber };

          personsService
            .update(existingPerson.id, updatedPerson)
            .then((response) => {
              setPersons(
                persons.map((person) =>
                  person.id !== existingPerson.id ? person : response.data
                )
              );
              setNewName("");
              setNewNumber("");
            });
        }
      } else {
        alert(`${newName} with this number already exists in the phonebook.`);
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personsService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .del(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
  };

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
      <DisplayPersons
        filteredPersons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
