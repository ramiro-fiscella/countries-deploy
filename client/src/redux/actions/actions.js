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
} from "./actionTypes";

import axios from "axios";

export const getCountries = () => {
  return async (dispatch) => {
    try {
      const countriesData = await axios.get("/countries");

      console.log(countriesData);
      const countries = countriesData.data;

      dispatch({ type: GET_COUNTRIES, payload: countries });
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };
};
export const getActivities = () => {
  return async (dispatch) => {
    try {
      const activitiesData = await axios.get("/activities");

      console.log(activitiesData);
      const activities = activitiesData.data;

      dispatch({ type: GET_ACTIVITIES, payload: activities });
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };
};

export const getCountryDetail = (id) => {
  return async (dispatch) => {
    try {
      const countryData = await axios.get(`/countries/${id}`);
      console.log(countryData);
      const country = countryData.data;

      dispatch({ type: GET_COUNTRY_BY_ID, payload: country });
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };
};

export const setSearchQuery = (searchQuery) => ({
  type: SET_SEARCH_QUERY,
  payload: searchQuery,
});

export const setSelectedContinent = (continent) => ({
  type: SET_SELECTED_CONTINENT,
  payload: continent,
});
export const setSelectedActivity = (activity) => ({
  type: SET_SELECTED_ACTIVITY,
  payload: activity,
});

export const setSortOption = (sortOption) => {
  return {
    type: SET_SORT_OPTION,
    payload: sortOption,
  };
};

export const createActivity = (activityData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/activities", activityData);
      dispatch({
        type: POST_ACTIVITY,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});
