function SearchBar(props) {
  // this updates the data to match the city
  async function clickSearch() {
    if (props.value) {
      const data = await fetch(props.url).then((res) => res.json());
      if (data.error) {
        alert('Oops, it seems that we don\'t have information about that city')
      }else{
        props.setData(data);
        document.querySelector(".container").classList.remove("hidden");
        document.querySelector("#cf").classList.remove("hidden");
      }
    }
  }

  // this updates the input
  function type(e) {
    props.setValue(e.target.value);
  }

  return (
    <div className="SearchBar">
      <input
        className="search"
        placeholder="Type a city here..."
        value={props.value}
        onChange={(e) => {
          type(e);
        }}
      />
      <button
        className="button"
        onClick={() => {
          clickSearch();
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
