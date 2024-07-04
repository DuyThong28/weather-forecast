const router = require("express").Router();
const userController = require("../controllers/userController");

router
  .route("/")
  .post(userController.createUser)
  .put(userController.updateCity)
  .delete(userController.deleteUser)
  .get(userController.findUserByEmail);

router.route("/send-otp").post(userController.sendOTP);
router.route("/check-otp").post(userController.checkOTP);

module.exports = router;
