"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "@/components/shared/Sidebar";
import { useAuth } from "@/components/modules/Auth/context/AuthContext";
import Loading from "@/components/ui/Loading";
import AdminLayout from "@/components/admin/AdminLayout";
import UserLayout from "@/components/user/UserLayout";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1️⃣ Show loading for 5 seconds by default
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); // 5 seconds delay
    return () => clearTimeout(timer);
  }, []);

  // 2️⃣ Redirect if no user after loading
  useEffect(() => {
    if (!loading && user === null) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // 3️⃣ Show loading screen
  if (loading || !user) {
    return <Loading />;
  }

  // 4️⃣ Show main layout after loading is done
  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for large screens */}
      <div className="hidden md:flex">
        <Sidebar role={user.role} />
      </div>

      {/* Sidebar toggle for small screens */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded bg-pink-500 text-white shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-64 bg-gray-900 text-white p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 rounded bg-pink-500"
            >
              <X className="w-6 h-6" />
            </button>
            <Sidebar role={user.role} />
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 p-4 md:p-6">
        {user.role === "Admin" ? (
          <AdminLayout>{children}</AdminLayout>
        ) : (
          <UserLayout>{children}</UserLayout>
        )}
      </div>
    </main>
  );
}
