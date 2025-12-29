const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router.post("/", auth, role("admin"), createProject);
router.get("/", auth, getProjects);
router.put("/:id", auth, role("admin"), updateProject);
router.delete("/:id", auth, role("admin"), deleteProject);

module.exports = router;
