"use client";

import React, { ReactNode } from "react";
import Sidebar from "@/components/shared/Sidebar";

import { useAuth } from "@/components/modules/Auth/context/AuthContext";
import Loading from "@/components/ui/Loading";
import AdminLayout from "@/components/admin/AdminLayout";
import UserLayout from "@/components/user/UserLayout";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { user} = useAuth();
    // console.log("checkUser:",checkUser)

    // Show loading while auth status is being checked
    if ( !user) return <Loading />;

    // Deny access if not logged in after check
    if (!user) return <p className="text-red-500 text-center mt-10">Access Denied. Please login.</p>;

    return (
        <main className="min-h-dvh flex gap-4">
            <Sidebar role={user.role} />
            {user.role === "Admin" ? (
                <AdminLayout>{children}</AdminLayout>
            ) : (
                <UserLayout>{children}</UserLayout>
            )}
        </main>
    );
}
