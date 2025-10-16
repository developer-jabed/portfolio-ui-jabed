"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/components/modules/Auth/context/AuthContext";


export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("User logged out successfully!");
  };

  return (
    <nav className="fixed top-4 inset-x-4 md:inset-x-8 h-20 max-w-screen-xl mx-auto rounded-full bg-black/70 backdrop-blur-lg border border-gray-800 z-50 shadow-lg">
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex-shrink-0">
          <Logo />
        </Link>

        <div className="hidden md:block">
          <NavMenu />
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {!isLoggedIn ? (
            <Button className="rounded-full px-5 py-2 text-sm md:text-base bg-pink-500 hover:bg-pink-600 text-white transition">
              <Link href="/login" className="block w-full text-center">
                Login
              </Link>
            </Button>
          ) : (
            <Button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base bg-red-500 hover:bg-red-600 text-white transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          )}

          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
