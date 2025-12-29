const Task = require("../models/task");

// CREATE TASK (ADMIN)
exports.createTask = async (req, res) => {
  const { title, deadline, project, assignedTo } = req.body;

  if (!title || !deadline || !project || !assignedTo) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  const task = await Task.create(req.body);
  res.status(201).json(task);
};


// GET ALL TASKS (ADMIN)
exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("project", "name")
    .populate("assignedTo", "name email");
  res.json(tasks);
};

// UPDATE TASK (EDIT / REASSIGN)
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Task deleted" });
};

// INTERN – GET MY TASKS
exports.getMyTasks = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user.id })
    .populate("project", "name");
  res.json(tasks);
};

// INTERN – UPDATE TASK STATUS
exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(task);
};

// GET SINGLE TASK (ADMIN / INTERN)
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("project", "name")
      .populate("assignedTo", "name email");

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch task" });
  }
};

