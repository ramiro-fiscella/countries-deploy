import React from "react";
import { useSelector } from "react-redux";

import styles from "./ContinentFilter.module.css";

const ContinentFilter = ({ onChange = () => {} }) => {
  const continents = useSelector((state) => state.continents);

  const handleContinentChange = (event) => {
    const selectedContinent = event.target.value;
    onChange(selectedContinent);
  };

  return (
    <div className={styles.filterContainer}>
      <select onChange={handleContinentChange}>
        <option value="All">All Continents</option>
        {continents.map((continent) => (
          <option key={continent} value={continent}>
            {continent}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ContinentFilter;
