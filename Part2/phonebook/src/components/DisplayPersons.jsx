import Person from "./Person";

const DisplayPersons = ({ filteredPersons, handleDeletePerson }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <Person
          key={person.id}
          person={person}
          handleDeletePerson={handleDeletePerson}
        />
      ))}
    </ul>
  );
};

export default DisplayPersons;
