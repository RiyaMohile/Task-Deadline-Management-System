import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditId(null);
  };

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Project name required");

    if (editId) {
      await API.put(`/projects/${editId}`, { name, description });
    } else {
      await API.post("/projects", { name, description });
    }

    resetForm();
    setShowModal(false);
    fetchProjects();
  };

  const handleEdit = (project) => {
    setEditId(project._id);
    setName(project.name);
    setDescription(project.description);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete project?")) {
      await API.delete(`/projects/${id}`);
      fetchProjects();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Project Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage projects and assign tasks efficiently
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition"
        >
          + Create Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 mt-20">
            No projects created yet
          </div>
        ) : (
          projects.map((p) => (
            <div
              key={p._id}
              className="relative bg-white rounded-2xl p-5 border border-blue-200
                shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Left strip */}
              <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-2xl" />

              {/* Title */}
              <h2 className="font-semibold text-lg text-gray-800 mb-1">
                {p.name}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {p.description || "No description provided"}
              </p>

              {/* Created Date */}
              <p className="text-xs text-gray-500 mb-4">
                Created on {new Date(p.createdAt).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-4 py-1.5 text-sm rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-4 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-[420px] p-7"
          >
            <h2 className="text-xl font-bold mb-5">
              {editId ? "Edit Project" : "Create New Project"}
            </h2>

            <div className="space-y-4">
              <input
                className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                className="border p-3 w-full rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project Description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className={`px-5 py-2 rounded text-white
                  ${editId ? "bg-yellow-500" : "bg-blue-600"}
                `}
              >
                {editId ? "Update Project" : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
