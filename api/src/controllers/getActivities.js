const { Activity, Country } = require("../db");

const getActivities = async (req, res) => {
  try {
    const allActivities = await Activity.findAll({ include: Country });

    if (allActivities && allActivities.length > 0) {
      return res.status(200).json(allActivities);
    } else {
      return res
        .status(404)
        .json(allActivities.length ? allActivities : "There are no activities");
    }
  } catch (error) {
    return res.status(500).json({ error: "Error getting activities" });
  }
};
module.exports = { getActivities };
