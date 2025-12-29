const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getMyTasks,
  updateStatus,
  getTaskById
} = require("../controllers/taskController");

// ADMIN
router.post("/", auth, role("admin"), createTask);
router.get("/", auth, role("admin"), getAllTasks);
router.put("/:id", auth, role("admin"), updateTask);
router.delete("/:id", auth, role("admin"), deleteTask);

// INTERN
router.get("/my", auth, getMyTasks);
router.put("/:id/status", auth, updateStatus);

router.get("/:id", auth, getTaskById);

module.exports = router;
