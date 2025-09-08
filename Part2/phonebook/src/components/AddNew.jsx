const AddNew = ({
  addContact,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
}) => {
  return (
    <form onSubmit={addContact}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          name="name_input"
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
          name="number_input"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddNew;
