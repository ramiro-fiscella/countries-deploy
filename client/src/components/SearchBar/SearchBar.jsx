import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/actions/actions";

import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchQuery);

  const handleSearch = (event) => {
    const query = event.target.value;
    dispatch(setSearchQuery(query));
  };

  const handleClear = () => {
    dispatch(setSearchQuery(""));
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        id="searchInput"
        placeholder="🔍 Search country"
        value={searchQuery}
        onChange={handleSearch}
        aria-label="Search by country name"
        aria-labelledby="searchInput"
      />
      {searchQuery && (
        <button className={styles.clearButton} onClick={handleClear}>
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
