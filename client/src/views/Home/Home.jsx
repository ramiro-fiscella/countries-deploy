import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getCountries,
  getActivities,
  setSelectedContinent,
  setSelectedActivity,
  setPage,
} from "../../redux/actions/actions";
import {
  CardContainer,
  ContinentFilter,
  populationSort,
  AlphSort,
} from "../../components";
import styles from "./Home.module.css";
import ActivityFilter from "../../components/ActivityFilter/ActivityFilter";

const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const searchQuery = useSelector((state) => state.searchQuery);
  const selectedContinent = useSelector((state) => state.selectedContinent);
  const selectedActivity = useSelector((state) => state.selectedActivity);
  const sortOption = useSelector((state) => state.sortOption);
  const currentPage = useSelector((state) => state.currentPage);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  const filteredCountries = countries.filter((country) => {
    return (
      (!searchQuery ||
        country.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedContinent === "All" ||
        country.continent === selectedContinent) &&
      (selectedActivity === "All" ||
        country.Activities.some(
          (activity) => activity.name === selectedActivity
        ))
    );
  });

  const sortedCountries = filteredCountries.slice().sort((a, b) => {
    if (sortOption === "pop_asc") {
      return a.population - b.population;
    } else if (sortOption === "pop_desc") {
      return b.population - a.population;
    } else if (sortOption === "name_asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "name_desc") {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  const countriesPerPage = 10;
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const currentCountries = sortedCountries.slice(startIndex, endIndex);

  const handleContinentFilter = (continent) => {
    dispatch(setSelectedContinent(continent));
    dispatch(setPage(1));
  };

  const handleActivityFilter = (activity) => {
    dispatch(setSelectedActivity(activity));
    dispatch(setPage(1));
  };

  const newTotalPages = Math.ceil(sortedCountries.length / countriesPerPage);
  useEffect(() => {
    if (currentPage > newTotalPages) {
      dispatch(setPage(1));
    }
  }, [currentPage, newTotalPages]);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.filterContainer}>
          <ContinentFilter onChange={handleContinentFilter} />
          <ActivityFilter onChange={handleActivityFilter} />
        </div>

        <div className={styles.sortContainer}>
          <populationSort />
          <AlphSort />
        </div>
      </div>

      <h1>LIST OF COUNTRIES</h1>
      <CardContainer
        countries={currentCountries}
        selectedContinent={selectedContinent}
      />

      <div className={styles.pagination}>
        <button
          onClick={() => dispatch(setPage(1))}
          disabled={currentPage === 1}
        >
          First
        </button>

        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span className={styles.pageNumber}>{currentPage}</span>

        <button onClick={() => dispatch(setPage(currentPage + 1))}>Next</button>

        <button
          onClick={() =>
            dispatch(
              setPage(Math.ceil(sortedCountries.length / countriesPerPage))
            )
          }
        >
          Last
        </button>
      </div>
    </div>
  );
};
export default Home;
