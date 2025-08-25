import { useEffect, useState } from "react";
import API from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const { data } = await API.get(`/tasks?status=${statusFilter}`);
      setTasks(data);
    } catch (error) {
      setMessage("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      setMessage("Error adding task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      setMessage("Error deleting task");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, { completed: !task.completed });
      fetchTasks();
    } catch (error) {
      setMessage("Error updating task");
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditingTitle(task.title);
    setEditingDescription(task.description || "");
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingTitle("");
    setEditingDescription("");
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/tasks/${editingTaskId}`, {
        title: editingTitle,
        description: editingDescription,
      });
      cancelEditing();
      fetchTasks();
    } catch (error) {
      setMessage("Error editing task");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header">
          <h2 className="mb-0">My Tasks</h2>
        </div>
        <div className="card-body">
          {message && <div className="alert alert-info">{message}</div>}

          <form
            onSubmit={handleAddTask}
            className="mb-3 d-flex align-items-center gap-2 flex-wrap"
          >
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-control"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
            <button type="submit" className="btn btn-success">
              Add Task
            </button>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select w-auto"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </form>

          {tasks.length === 0 ? (
            <p>
              {statusFilter === "completed"
                ? "No completed tasks"
                : statusFilter === "pending"
                ? "No pending tasks"
                : "No tasks available"}
            </p>
          ) : (
            <div className="d-flex flex-column gap-2">
              {tasks.map((task) => (
                <div key={task._id} className="card shadow-sm">
                  <div className="card-body">
                    {editingTaskId === task._id ? (
                      <form className="w-100" onSubmit={handleEdit}>
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          required
                          className="form-control mb-1"
                        />
                        <input
                          type="text"
                          value={editingDescription}
                          onChange={(e) =>
                            setEditingDescription(e.target.value)
                          }
                          placeholder="Description"
                          className="form-control mb-1"
                        />
                        <div className="mt-1">
                          <button
                            type="submit"
                            className="btn btn-success btn-sm me-2"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelEditing}
                            className="btn btn-secondary btn-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                          <strong>{task.title}</strong> <br />
                          {task.description || "No description"} <br />
                          {task.completed ? "✅ Completed" : "⏳ Pending"}
                        </div>
                        <div className="d-flex gap-1 flex-wrap mt-2 mt-md-0">
                          <button
                            onClick={() => handleToggleComplete(task)}
                            className="btn btn-warning btn-sm"
                          >
                            Status
                          </button>
                          <button
                            onClick={() => startEditing(task)}
                            className="btn btn-info btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
