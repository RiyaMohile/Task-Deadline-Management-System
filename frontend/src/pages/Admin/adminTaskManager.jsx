import { useEffect, useState } from "react";
import API from "../../services/api";

export default function AdminTaskManager() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [interns, setInterns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    deadline: "",
    project: "",
    assignedTo: "",
  });

  // Fetch all data
  const fetchData = async () => {
    const t = await API.get("/tasks");
    const p = await API.get("/projects");
    const u = await API.get("/users?role=intern");
    setTasks(t.data);
    setProjects(p.data);
    setInterns(u.data);
  };

  // Auto refresh every 5 sec
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      priority: "Low",
      deadline: "",
      project: "",
      assignedTo: "",
    });
    setEditId(null);
  };

  const handleSubmit = async () => {
    if (!form.title || !form.deadline || !form.project || !form.assignedTo) {
      alert("Please fill all required fields");
      return;
    }

    if (editId) {
      await API.put(`/tasks/${editId}`, form);
    } else {
      await API.post("/tasks", form);
    }

    resetForm();
    setShowModal(false);
    fetchData();
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      deadline: task.deadline.slice(0, 10),
      project: task.project._id,
      assignedTo: task.assignedTo._id,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete task?")) {
      await API.delete(`/tasks/${id}`);
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-8 py-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Task Management
          </h1>
          <p className="text-sm text-gray-500">
            Track intern progress in real time
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition"
        >
          + Create Task
        </button>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 mt-20">
            No tasks found
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`relative bg-white rounded-2xl p-5 border shadow-sm
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                ${
                  task.status === "Completed"
                    ? "border-green-300"
                    : task.status === "In Progress"
                    ? "border-purple-300"
                    : "border-yellow-300"
                }
              `}
            >
              {/* Status Strip */}
              <span
                className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl
                  ${
                    task.status === "Completed"
                      ? "bg-green-500"
                      : task.status === "In Progress"
                      ? "bg-purple-500"
                      : "bg-yellow-400"
                  }
                `}
              />

              {/* Title & Status */}
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-semibold text-lg text-gray-800">
                  {task.title}
                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold
                    ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "In Progress"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {task.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {task.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 text-xs mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                  {task.project?.name}
                </span>

                <span
                  className={`px-3 py-1 rounded-full font-semibold
                    ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }
                  `}
                >
                  {task.priority}
                </span>

                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold">
                  {task.assignedTo?.name}
                </span>
              </div>

              {/* Deadline */}
              <p
                className={`text-xs font-medium mb-4
                  ${
                    new Date(task.deadline) < new Date() &&
                    task.status !== "Completed"
                      ? "text-red-600"
                      : "text-gray-500"
                  }
                `}
              >
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="px-4 py-1.5 text-sm rounded-lg bg-yellow-400 text-white hover:bg-yellow-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-4 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
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
            className="bg-white rounded-2xl shadow-2xl w-[480px] p-7"
          >
            <h2 className="text-xl font-bold mb-5">
              {editId ? "Edit Task" : "Create Task"}
            </h2>

            <div className="space-y-4">
              <input
                className="border p-3 w-full rounded"
                placeholder="Task Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <textarea
                className="border p-3 w-full rounded resize-none"
                placeholder="Task Description"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  className="border p-3 rounded"
                  value={form.deadline}
                  onChange={(e) =>
                    setForm({ ...form, deadline: e.target.value })
                  }
                />

                <select
                  className="border p-3 rounded"
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <select
                className="border p-3 w-full rounded"
                value={form.project}
                onChange={(e) =>
                  setForm({ ...form, project: e.target.value })
                }
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <select
                className="border p-3 w-full rounded"
                value={form.assignedTo}
                onChange={(e) =>
                  setForm({ ...form, assignedTo: e.target.value })
                }
              >
                <option value="">Assign Intern</option>
                {interns.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.name} ({i.email})
                  </option>
                ))}
              </select>
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
                {editId ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
