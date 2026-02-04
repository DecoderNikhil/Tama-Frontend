"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterForm = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await api.post("/auth/register", data);

      setAccessToken(res.data.data.accessToken);
      toast.success("Account created");

      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4 border p-6 rounded-lg">
        <h1 className="text-xl font-semibold text-center">Register</h1>

        <input {...register("name")} placeholder="Name" className="w-full border px-3 py-2 rounded" />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

        <input {...register("email")} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

        <button disabled={isSubmitting} className="w-full bg-black text-white py-2 rounded">
          {isSubmitting ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}
