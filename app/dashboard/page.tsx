"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Task, TaskStatus } from "@/types/task";
import toast from "react-hot-toast";
import TaskItem from "@/components/tasks/TaskItem";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import { useAuthStore } from "@/store/auth.store";

type StatusFilter = "ALL" | TaskStatus;

export default function DashboardPage() {
  const accessToken = useAuthStore((s) => s.accessToken);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [status, setStatus] = useState<StatusFilter>("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCreate, setShowCreate] = useState(false);

  const LIMIT = 5;

  const fetchTasks = async () => {
    if (!accessToken) return;

    setLoading(true);
    try {
      const res = await api.get("/tasks", {
        params: {
          page,
          limit: LIMIT,
          status: status === "ALL" ? undefined : status,
          title: search || undefined, // IMPORTANT: backend expects `title`
        },
      });

      setTasks(res.data.data.tasks);
      setTotalPages(res.data.data.totalPages);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
  };

  /* Fetch when page / filters change */
  useEffect(() => {
    fetchTasks();
  }, [page, status, search, accessToken]);

  /* Reset page when filter/search changes */
  useEffect(() => {
    setPage(1);
  }, [status, search]);

  /* Task handlers */
  const handleTaskUpdated = (updated: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleTaskDeleted = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-orange-700">My Tasks</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setShowCreate(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            + New Task
          </button>

          <button
            onClick={logout}
            className="border border-orange-600 text-orange-600 px-4 py-2 rounded hover:bg-orange-50"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
          className="border px-2 py-1 rounded"
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
        />
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onUpdated={handleTaskUpdated} onDeleted={handleTaskDeleted} />
        ))}

        {!loading && tasks.length === 0 && <p className="text-center text-gray-500">No tasks found</p>}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 justify-center mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 border rounded ${p === page ? "bg-black text-white" : ""}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreate && <CreateTaskModal onClose={() => setShowCreate(false)} onCreated={() => fetchTasks()} />}
    </div>
  );
}
