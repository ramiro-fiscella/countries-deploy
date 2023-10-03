import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getActivities,
  getCountries,
  createActivity,
} from "../../redux/actions/actions";

import validation from "./Validation";

import styles from "./ActivityForm.module.css";

const ActivityForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [activityData, setActivityData] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const countries = useSelector((state) => state.countries).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors(
      validation({
        ...activityData,
        [event.target.name]: event.target.value,
      })
    );
  };
  const handleCountrySelectChange = (event) => {
    const selectedCountryId = event.target.value;

    if (!activityData.countries.includes(selectedCountryId)) {
      setActivityData((prevData) => ({
        ...prevData,
        countries: [...prevData.countries, selectedCountryId],
      }));
    }
  };

  const handleRemoveCountry = (countryId) => {
    setActivityData((prevData) => ({
      ...prevData,
      countries: prevData.countries.filter((id) => id !== countryId),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputErrors = validation(activityData);
    setErrors(inputErrors);

    if (Object.keys(inputErrors).length === 0) {
      try {
        dispatch(createActivity(activityData));
        setActivityData({
          name: "",
          difficulty: "",
          duration: "",
          season: "",
          countries: [],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Activity Form</h1>
      <p>
        Fill out the following form to create a new activity and add it to the
        countries of your choice.
      </p>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2>Create a new activity</h2>
        <label>Name:</label>
        <input
          placeholder="activity name"
          type="text"
          name="name"
          value={activityData.name}
          onChange={handleChange}
        />
        {errors.name ? <p className={styles.errors}>{errors.name}</p> : null}
        <label>Difficulty:</label>
        <select
          name="difficulty"
          value={activityData.difficulty}
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {errors.difficulty && (
          <p className={styles.errors}>
            {errors.difficulty ? errors.difficulty : null}
          </p>
        )}
        <label>Duration (in hours):</label>
        <input
          placeholder="activity duration"
          type="number"
          name="duration"
          value={activityData.duration}
          onChange={handleChange}
          min="1"
          max="24"
          required
        />
        {errors.duration ? (
          <p className={styles.errors}>{errors.duration}</p>
        ) : null}
        <label>Season:</label>
        <select
          name="season"
          value={activityData.season}
          onChange={handleChange}
        >
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
        </select>
        {errors.season && (
          <p className={styles.errors}>
            {errors.season ? errors.season : null}
          </p>
        )}
        <label>Countries:</label>
        <select onChange={handleCountrySelectChange} required>
          <option value="" hidden>
            Select country
          </option>
          {countries.map((country) => (
            <option value={country.id} key={country.id}>
              {country.name}
            </option>
          ))}
        </select>

        {activityData.countries.length > 0 && (
          <div className={styles.activityCountryList}>
            <p>Selected Countries:</p>
            <ul>
              {activityData.countries.map((countryId) => (
                <li key={countryId}>
                  <button
                    className={styles.removeButton}
                    type="button"
                    onClick={() => handleRemoveCountry(countryId)}
                  >
                    ❌
                    {
                      countries.find((country) => country.id === countryId)
                        ?.name
                    }
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          disabled={
            Object.keys(errors).length > 0 ||
            !activityData.name ||
            !activityData.difficulty ||
            !activityData.duration ||
            !activityData.season ||
            activityData.countries.length === 0
          }
        >
          Add activity
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;
