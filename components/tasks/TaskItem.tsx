"use client";

import { Task } from "@/types/task";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

interface Props {
  task: Task;
  onUpdated: (task: Task) => void;
  onDeleted: (id: string) => void;
}

export default function TaskItem({ task, onUpdated, onDeleted }: Props) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    setLoading(true);
    try {
      const res = await api.patch(`/tasks/${task.id}/toggle`);
      onUpdated(res.data.data.task);
    } catch {
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${task.id}`);
      onDeleted(task.id);
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <>
      <div className="border rounded p-4 bg-orange-50">
        {/* Header */}
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
          <div>
            <p className="font-medium text-orange-800">{task.title}</p>
            <p className={`text-sm ${task.status === "COMPLETED" ? "text-green-600" : "text-orange-500"}`}>
              {task.status}
            </p>
          </div>

          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {/* Toggle */}
            <button
              onClick={toggleStatus}
              disabled={loading}
              className={`text-sm px-2 py-1 rounded ${
                task.status === "COMPLETED" ? "bg-green-600 text-white" : "bg-orange-500 text-white"
              }`}
            >
              {task.status === "COMPLETED" ? "Completed" : "Mark Done"}
            </button>

            {/* Edit */}
            <button onClick={() => setEditing(true)} className="text-orange-700 font-semibold" title="Edit">
              ✏️
            </button>

            {/* Delete */}
            <button onClick={deleteTask} className="text-red-600 font-bold" title="Delete">
              ✕
            </button>
          </div>
        </div>

        {/* Expanded */}
        {open && (
          <div className="mt-3 text-sm text-gray-700 space-y-2">
            <p>{task.description || "No description"}</p>

            {task.Deadline && (
              <p className="text-xs text-gray-500">Deadline: {new Date(task.Deadline).toLocaleDateString()}</p>
            )}
          </div>
        )}
      </div>

      {editing && <EditTaskModal task={task} onClose={() => setEditing(false)} onUpdated={onUpdated} />}
    </>
  );
}
