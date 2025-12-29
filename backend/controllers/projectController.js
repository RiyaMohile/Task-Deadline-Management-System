const Project = require("../models/project");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create project" });
  }
};

// GET ALL PROJECTS
exports.getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

// UPDATE PROJECT
exports.updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(project);
};

// DELETE PROJECT
exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ msg: "Project deleted" });
};
