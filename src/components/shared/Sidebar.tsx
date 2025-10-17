"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  role: "Admin" | "User";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Default home based on role
  const homePath = role === "Admin" ? "/dashboard/admin" : "/dashboard/user";

  const adminLinks = [
    { name: "Home", path: "/dashboard/admin" },
    { name: "Users", path: "/dashboard/admin/users" },
    { name: "Messages", path: "/dashboard/admin/message" },
    { name: "Update Profile", path: "/dashboard/admin/profile" },
    { name: "Blog setting", path: "/dashboard/admin/blog" },
    { name: "Project setting", path: "/dashboard/admin/project" },
  ];

  const userLinks = [
    { name: "Home", path: "/dashboard/user" },
    { name: "Update Profile", path: "/dashboard/user/profile" },
    { name: "Blog setting", path: "/dashboard/user/blog" },
   
  ];

  const links = role === "Admin" ? adminLinks : userLinks;

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col gap-4">
      <h2
        className="text-2xl font-bold text-pink-400 mb-4 cursor-pointer"
        onClick={() => router.push(homePath)}
      >
        Dashboard
      </h2>
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`block p-2 rounded hover:bg-pink-500 transition ${pathname === link.path ? "bg-pink-600 font-bold" : ""
            }`}
        >
          {link.name}
        </Link>
      ))}
    </aside>
  );
}
