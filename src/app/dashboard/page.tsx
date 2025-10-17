"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import Loading from "@/components/ui/Loading";

interface User {
  name: string;
  email: string;
  role: string;
  picture?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
          withCredentials: true,
        });

        if (!res.data.data) {
          router.push("/login");
        } else {
          setUser(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching user", err);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);


  if (!user) {
    return (

      <Loading></Loading>

    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center"
    >

    </motion.div>
  );
}
