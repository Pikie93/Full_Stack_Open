const SearchFilter = ({ searchValue, setSearch }) => {
  return (
    <div>
      Find countries:{""}
      <input
        value={searchValue}
        onChange={(event) => setSearch(event.target.value)}
        name="search_input"
      />
    </div>
  );
};

export default SearchFilter;
