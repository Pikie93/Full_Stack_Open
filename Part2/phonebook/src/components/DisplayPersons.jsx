import Person from "./Person";

const DisplayPersons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </ul>
  );
};

export default DisplayPersons;
