import styles from "./populationSort.module.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSortOption } from "../../redux/actions/actions";

const populationSort = () => {
  const dispatch = useDispatch();
  const [isAscending, setIsAscending] = useState(true);

  const handleSortClick = () => {
    const newSortOrder = isAscending ? "pop_desc" : "pop_asc";
    setIsAscending(!isAscending);
    dispatch(setSortOption(newSortOrder));
  };

  return (
    <div className={styles.populationSort}>
      <button onClick={handleSortClick}>
        {isAscending ? "▲ pop" : "▼ pop"}
      </button>
    </div>
  );
};

export default populationSort;
