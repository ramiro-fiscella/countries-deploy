import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSortOption } from "../../redux/actions/actions";
import styles from "./AlphSort.module.css";

const AlphSort = () => {
  const dispatch = useDispatch();
  const [isAscending, setIsAscending] = useState(true);
  const sortText = isAscending ? "A / Z ▲" : "A / Z ▼";

  const handleSortClick = () => {
    const newSortOrder = isAscending ? "name_asc" : "name_desc";
    setIsAscending(!isAscending);
    dispatch(setSortOption(newSortOrder));
  };

  return (
    <div className={styles.alphSort}>
      <button className={styles.sortButton} onClick={handleSortClick}>
        {sortText}
      </button>
    </div>
  );
};

export default AlphSort;
