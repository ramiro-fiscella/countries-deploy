import {
  GET_COUNTRIES,
  GET_ACTIVITIES,
  GET_COUNTRY_BY_ID,
  SET_SEARCH_QUERY,
  SET_SELECTED_CONTINENT,
  SET_SELECTED_ACTIVITY,
  POST_ACTIVITY,
  SET_SORT_OPTION,
  SET_PAGE,
} from "./actions/actionTypes";

const initialState = {
  countries: [],
  activities: [],
  country: {
    id: "",
    name: "",
    flag: "",
    continent: "",
    capital: "",
    subregion: "",
    area: 0,
    population: 0,
    Activities: [],
  },
  continents: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
  searchQuery: "",
  selectedContinent: "All",
  selectedActivity: "All",
  sortOption: "",
  currentPage: 1,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload,
        originalCountries: payload,
        selectedContinent: "All",
      };
    case GET_ACTIVITIES:
      return { ...state, activities: payload, selectedActivity: "All" };

    case GET_COUNTRY_BY_ID:
      return { ...state, country: payload };

    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: payload };

    case SET_SELECTED_CONTINENT:
      return { ...state, selectedContinent: payload };

    case SET_SELECTED_ACTIVITY:
      const filteredCountries =
        payload === "All"
          ? state.originalCountries
          : state.originalCountries.filter(
              (country) =>
                country.Activities &&
                country.Activities.some((activity) => activity.name === payload)
            );
      return {
        ...state,
        countries: filteredCountries,
        selectedActivity: payload,
      };

    case SET_SORT_OPTION:
      const sortedCountries = state.originalCountries
        .slice()
        .sort((countryA, countryB) => {
          if (payload === "pop_asc") {
            return countryA.population - countryB.population;
          } else if (payload === "pop_desc") {
            return countryB.population - countryA.population;
          } else if (payload === "name_asc") {
            return countryA.name.localeCompare(countryB.name);
          } else if (payload === "name_desc") {
            return countryB.name.localeCompare(countryA.name);
          } else {
            return 0;
          }
        });

      const filteredAndSortedCountries = sortedCountries.filter((country) => {
        return (
          (!state.searchQuery ||
            country.name
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase())) &&
          (state.selectedContinent === "All" ||
            country.continent === state.selectedContinent) &&
          (state.selectedActivity === "All" ||
            country.Activities.some(
              (activity) => activity.name === state.selectedActivity
            ))
        );
      });

      return {
        ...state,
        countries: filteredAndSortedCountries,
        sortOption: payload,
      };

    case POST_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, payload],
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: payload,
      };

    default:
      return state;
  }
};

export default reducer;
