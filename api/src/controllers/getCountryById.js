const { Country, Activity } = require("../db");

const getCountryById = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findOne({
      where: { id: id.toUpperCase() },
      include: Activity,
    });

    country
      ? res.status(200).json(country)
      : res.status(404).json({ message: "Country not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching country details by id" });
  }
};

module.exports = { getCountryById };
