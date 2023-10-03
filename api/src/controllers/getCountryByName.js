const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const getCountryByName = async (req, res) => {
  const { name } = req.query;
  try {
    const countries = await Country.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: Activity,
    });

    countries
      ? res.status(200).json(countries)
      : res
          .status(404)
          .json({ message: `Can't find any country with ${name}` });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching countries by name" });
  }
};

module.exports = { getCountryByName };
