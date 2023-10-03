const { Country, Activity } = require("../db");

// Ruta para obtener todos los países
const getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll({ include: Activity });
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: "Error fetching countries" });
  }
};

module.exports = { getCountries };
