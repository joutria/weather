function SearchBar({ value, setValue, onSearch }) {
  return (
    <div className="SearchBar">
      <input
        className="search"
        placeholder="Type a city here..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onSearch(); }}
      />
      <button
        className="button"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
