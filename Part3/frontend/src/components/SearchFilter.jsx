const SearchFilter = ({ searchValue, setSearch }) => {
  return (
    <div>
      Filter shown with:{""}
      <input
        value={searchValue}
        onChange={(event) => setSearch(event.target.value)}
        name="search_input"
        placeholder="Filter contacts"
      />
    </div>
  );
};

export default SearchFilter;
