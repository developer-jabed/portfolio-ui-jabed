"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

type RegisterFormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  picture?: string;
  role?: string;
  status?: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      picture: "",
      role: "User",
      status: "ACTIVE",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/v1/user/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      toast.success("🎉 Registration successful! Redirecting to login...");
      form.reset();

      // Redirect to login page after 1.5s
      setTimeout(() => router.push("/login"), 1500);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md bg-gray-900/90 p-8 rounded-2xl shadow-lg border border-pink-500/20"
        >
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Register Now
          </h2>

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className="bg-gray-800 text-white border-pink-500/40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="bg-gray-800 text-white border-pink-500/40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
                    {...field}
                    className="bg-gray-800 text-white border-pink-500/40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Picture */}
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Profile Picture URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://your-photo-link.com"
                    {...field}
                    className="bg-gray-800 text-white border-pink-500/40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Status</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full bg-gray-800 text-white border border-pink-500/40 rounded-md px-3 py-2"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="BLOCKED">BLOCKED</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      className="bg-gray-800 text-white border-pink-500/40 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-pink-400"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full mt-2 bg-pink-400 hover:bg-pink-500 text-black"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
