const { Router } = require("express");
const router = Router();

const { createActivity } = require("../controllers/createActivity");
const { getActivities } = require("../controllers/getActivities");

router.get("/activities", getActivities);
router.post("/activities", createActivity);

module.exports = router;
