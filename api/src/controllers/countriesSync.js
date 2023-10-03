const axios = require("axios");
const { Country } = require("../db");
const URL = "https://restcountries.com/v3.1/all";

const countriesSync = async () => {
  console.log("Loading data...");

  try {
    const alreadyInDb = await Country.count();
    if (!alreadyInDb) {
      const response = await axios.get(URL);
      const countriesData = response.data;

      for (const countryData of countriesData) {
        let cap = "None";
        if (Array.isArray(countryData.capital)) {
          cap = countryData.capital.pop();
        }

        await Country.create({
          id: countryData.cca3,
          name: countryData.name.common,
          flag: countryData.flags.svg,
          continent: countryData.region,
          capital: cap,
          subregion: countryData.subregion,
          area: countryData.area,
          population: countryData.population,
        });
      }

      console.log("Countries data loaded successfully");
      return { message: "Countries data loaded successfully" };
    } else {
      console.log("Countries are already in the database");
      return { message: "Countries are already in the database" };
    }
  } catch (error) {
    console.error("Error loading data:", error);
    return { error: "Error loading data from API" };
  }
};

module.exports = { countriesSync };
