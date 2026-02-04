"use client";

import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import { Task } from "@/types/task";

interface Props {
  task: Task;
  onClose: () => void;
  onUpdated: (task: Task) => void;
}

interface FormData {
  title: string;
  description: string;
  Deadline?: string;
}

export default function EditTaskModal({ task, onClose, onUpdated }: Props) {
  const { register, handleSubmit, formState } = useForm<FormData>({
    defaultValues: {
      title: task.title,
      description: task.description,
      Deadline: task.Deadline?.slice(0, 10),
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.patch(`/tasks/${task.id}`, data);
      onUpdated(res.data.data.task);
      toast.success("Task updated");
      onClose();
    } catch {
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-5 rounded w-full max-w-sm space-y-3">
        <h2 className="font-semibold text-lg">Edit Task</h2>

        <input
          {...register("title", { required: true })}
          className="border px-2 py-1 w-full rounded"
          placeholder="Title"
        />

        <textarea
          {...register("description")}
          className="border px-2 py-1 w-full rounded"
          placeholder="Description"
        />

        <input type="date" {...register("Deadline")} className="border px-2 py-1 w-full rounded" />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="text-gray-600">
            Cancel
          </button>
          <button
            className="bg-orange-600 text-white px-4 py-1 rounded hover:bg-orange-700"
            disabled={formState.isSubmitting}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
