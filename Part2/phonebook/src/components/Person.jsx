const Person = ({ person, handleDeletePerson }) => {
  return (
    <li>
      {person.name}, {person.number}{" "}
      <button onClick={() => handleDeletePerson(person.id, person.name)}>
        Delete
      </button>
    </li>
  );
};

export default Person;
