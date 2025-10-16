"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  role: "Admin" | "User";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const adminLinks = [
    { name: "Home", path: "/dashboard/admin" },
    { name: "Users", path: "/dashboard/admin/users" },
    { name: "Update Profile", path: "/dashboard/admin/profile" },
    { name: "Add Blog", path: "/dashboard/admin/blog" },
    { name: "Add Project", path: "/dashboard/admin/project/add" },
    { name: "Update Project", path: "/dashboard/admin/project/update" },
  ];


  const userLinks = [
    { name: "Home", path: "/dashboard/user" },
    { name: "Update Profile", path: "/dashboard/user/profile/update" },
  ];

  const links = role === "Admin" ? adminLinks : userLinks;

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-pink-400 mb-4">Dashboard</h2>
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`block p-2 rounded hover:bg-pink-500 transition ${
            pathname === link.path ? "bg-pink-600 font-bold" : ""
          }`}
        >
          {link.name}
        </Link>
      ))}
    </aside>
  );
}
