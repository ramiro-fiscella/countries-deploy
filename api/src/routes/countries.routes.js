const { Router } = require("express");
const router = Router();
//traer controlladores y configurar rutas
const { countriesSync } = require("../controllers/countriesSync");
const { getCountries } = require("../controllers/getCountries");
const { getCountryById } = require("../controllers/getCountryById");
const { getCountryByName } = require("../controllers/getCountryByName");

// router.get("/", countriesSync);
router.get("/countries", getCountries);
router.get("/countries/:id", getCountryById);
router.get("/countries/name", getCountryByName);

module.exports = router;
