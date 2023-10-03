import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedActivity } from "../../redux/actions/actions";

import styles from "./ActivityFilter.module.css";

const ActivityFilter = () => {
  const dispatch = useDispatch();
  const { activities } = useSelector((state) => state);

  const handleActivityChange = (event) => {
    const selectedActivity = event.target.value;
    dispatch(setSelectedActivity(selectedActivity));
  };

  return (
    <div className={styles.activityFilter}>
      <select onChange={handleActivityChange}>
        <option value="All">All Activities</option>
        {activities.map(({ id, name }) => (
          <option key={id} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ActivityFilter;
