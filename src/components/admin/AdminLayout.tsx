"use client";

import React, { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex-1 p-8 bg-gray-800 text-white rounded-xl shadow-lg">
      {children}
    </div>
  );
}
