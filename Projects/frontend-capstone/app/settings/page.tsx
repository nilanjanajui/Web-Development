"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const settingsSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  notifications: z.boolean(),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { name: "", email: "", notifications: true },
  });

  const onSubmit = async (values: SettingsFormValues) => {
    setSaved(false);
    // Simulated persistence call — replace with the real API route.
    await new Promise((resolve) => setTimeout(resolve, 200));
    console.log("saved", values);
    setSaved(true);
  };

  return (
    <div className="p-8 max-w-md">
      <h1 className="text-xl font-semibold mb-4">Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            id="name"
            className="border p-2 w-full"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-red-600 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="border p-2 w-full"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-red-600 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            id="notifications"
            type="checkbox"
            {...register("notifications")}
          />
          <label htmlFor="notifications">Email notifications</label>
        </div>

        <button
          className="bg-black text-white px-4 py-2 disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>

        {saved && (
          <p role="status" className="text-green-700 text-sm mt-2">
            Settings saved.
          </p>
        )}
      </form>
    </div>
  );
}
