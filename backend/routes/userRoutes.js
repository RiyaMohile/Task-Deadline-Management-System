const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getInterns } = require("../controllers/userController");

router.get("/", auth, role("admin"), getInterns);

module.exports = router;
