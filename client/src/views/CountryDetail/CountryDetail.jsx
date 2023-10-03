import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCountryDetail } from "../../redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

import styles from "./CountryDetail.module.css";

const CountryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);

  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [dispatch, id]);

  return (
    <div className={styles.metaContainer}>
      <h1>COUNTRY DETAIL</h1>
      <img src={country.flag} alt={`Flag of ${country.name}`} />
      <div className={styles.mainContainer}>
        <div className={styles.countryContainer}>
          <h2>Country info:</h2>
          <p>Name: {country.name}</p>
          <p>Continent: {country.continent}</p>
          <p>Capital: {country.capital}</p>
          <p>Subregion: {country.subregion}</p>
          <p>Area: {country.area}</p>
          <p>Population: {country.population}</p>
        </div>

        {country.Activities.length > 0 && (
          <div className={styles.activitiesContainer}>
            <h2>Activities:</h2>
            <ul>
              {country.Activities.map((activity) => (
                <li key={activity.id}>
                  <p>{activity.name}</p>
                  <p>Difficulty: {activity.difficulty}</p>
                  <p>Duration: {activity.duration} mins</p>
                  <p>Season: {activity.season}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Link to="/countries">
        <button>back to home</button>
      </Link>
    </div>
  );
};

export default CountryDetail;
