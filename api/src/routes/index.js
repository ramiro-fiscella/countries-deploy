const { Router } = require("express");
const countryRouter = require("./countries.routes");
const activityRouter = require("./activities.routes");

const router = Router();

router.use("/", countryRouter);
router.use("/", activityRouter);

module.exports = router;
