"use client";

import { useForm } from "react-hook-form";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

interface FormData {
  title: string;
  description: string;
  Deadline?: string;
}

export default function CreateTaskModal({ onClose, onCreated }: Props) {
  const { register, handleSubmit, formState } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await api.post("/tasks", data);
      toast.success("Task created");
      onCreated();
      onClose();
    } catch {
      toast.error("Failed to create task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded w-full max-w-sm space-y-3">
        <h2 className="font-semibold">Create Task</h2>

        <input
          {...register("title", { required: true })}
          placeholder="Title"
          className="border px-2 py-1 w-full"
        />

        <textarea {...register("description")} placeholder="Description" className="border px-2 py-1 w-full" />

        <input type="date" {...register("Deadline")} className="border px-2 py-1 w-full" />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-black text-white px-3 py-1 rounded">Create</button>
        </div>
      </form>
    </div>
  );
}
