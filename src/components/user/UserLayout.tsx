"use client";

import React, { ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="flex-1 p-8 bg-gray-700 text-white rounded-xl shadow-lg">
      {children}
    </div>
  );
}
