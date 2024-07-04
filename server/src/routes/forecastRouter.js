const router = require("express").Router();
const forecastController = require("../controllers/forecastController");

router.route("/").get(forecastController.getForecastData);

router.route("/search").get(forecastController.getLocationData);

module.exports = router;
