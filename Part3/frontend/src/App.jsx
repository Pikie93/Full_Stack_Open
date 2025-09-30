import { useState, useEffect } from "react";
import SearchFilter from "./components/SearchFilter";
import AddNew from "./components/AddNew";
import DisplayPersons from "./components/DisplayPersons";
import personsService from "./services/personsService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearch] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    color: null,
  });

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();

    personsService.getAll().then((response) => {
      const freshPersons = response.data;

      const existingPerson = freshPersons.find(
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
                  freshPersons.map((person) =>
                    person.id !== existingPerson.id ? person : response.data
                  )
                );
                handleNotifications(
                  `'${existingPerson.name}' was updated successfully`,
                  "notification"
                );
              })
              .catch((error) => {
                handleNotifications(
                  `'Information of ${existingPerson.name}' has already been removed.`,
                  "error"
                );
                setPersons(persons.filter((ep) => ep.id !== existingPerson.id));
              });
          }
        } else {
          handleNotifications(
            `${newName} with this number already exists in the phonebook, updating display.`,
            "error"
          );
          personsService.getAll().then((response) => {
            setPersons(response.data);
          });
        }
      } else {
        const personObject = {
          name: newName,
          number: newNumber,
        };
        personsService.create(personObject).then((response) => {
          setPersons(persons.concat(response.data));
          handleNotifications(
            `'${personObject.name}' was added successfully`,
            "notification"
          );
        });
      }
      setNewName("");
      setNewNumber("");
    });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .del(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {
          handleNotifications(
            `'Information of ${name}' has already been removed.`,
            "error"
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const handleNotifications = (message, notificationType) => {
    const color = notificationType === "notification" ? "green" : "red";
    setNotification({ message, color });
    setTimeout(() => {
      setNotification({ message: null, color: null });
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        colorChoice={notification.color}
      />
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
