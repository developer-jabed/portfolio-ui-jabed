"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/components/modules/Auth/context/AuthContext";
import { toast } from "react-hot-toast";

interface ProfileType {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "ACTIVE" | "INACTIVE";
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setProfile({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id: (user as any).id, // cast if your user type doesn't have id
        name: user.name || "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        email: (user as any).email || "",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        status: (user as any).status || "ACTIVE",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        phone: (user as any).phone || "",
      });
      setLoading(false);
    }
  }, [user]);

  if (!user) return <p className="text-center mt-10 text-red-500">User not found</p>;
  if (loading || !profile) return <p className="text-center mt-10 text-gray-400">Loading...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => prev && { ...prev, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      await axios.patch(
        "http://localhost:5000/api/v1/user/update-profile",
        {
          userId: profile.id,
          name: profile.name,
          phone: profile.phone,
        },
        { withCredentials: true }
      );
      toast.success("Profile updated successfully!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-xl shadow-lg mt-10 text-white">
      <h1 className="text-3xl font-bold text-pink-400 mb-6">My Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full p-2 rounded-lg bg-gray-800 text-white"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="text"
            value={profile.email}
            readOnly
            className="w-full p-2 rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Status</label>
          <input
            type="text"
            value={profile.status}
            readOnly
            className="w-full p-2 rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-pink-400 hover:bg-pink-500 rounded-lg font-bold transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
