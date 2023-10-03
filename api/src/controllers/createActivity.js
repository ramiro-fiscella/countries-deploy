const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

const createActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  console.log("Received data from request:");
  console.log("Name:", name);
  console.log("Difficulty:", difficulty);
  console.log("Duration:", duration);
  console.log("Season:", season);
  console.log("Countries:", countries);

  try {
    if (name && difficulty && duration && season && countries) {
      const [activity, created] = await Activity.findOrCreate({
        where: { name, difficulty, duration, season },
      });

      // Add countries to the activity
      for (const countryId of countries) {
        const country = await Country.findOne({
          where: { id: { [Op.iLike]: `%${countryId}%` } },
        });
        if (country) {
          await country.addActivity(activity);
        }
      }

      return res.status(created ? 201 : 200).json(activity);
    } else {
      return res.status(400).json({ error: "Missing data" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error while creating activity" });
  }
};

module.exports = { createActivity };
