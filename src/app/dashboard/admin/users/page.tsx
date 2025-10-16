"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface UserType {
    id: string; // changed from _id
    name: string;
    email: string;
    role: "Admin" | "User";
    status: "ACTIVE" | "INACTIVE";
}

export default function Users() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const limit = 10;

    const fetchUsers = async (page: number) => {
        try {
            setLoading(true);
            const res = await axios.get(
                `http://localhost:5000/api/v1/user/all?page=${page}&limit=${limit}`,
                { withCredentials: true }
            );

            // If status not returned, default to ACTIVE
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const dataWithStatus = res.data.data.map((user: any) => ({
                ...user,
                status: user.status ?? "ACTIVE",
            }));

            setUsers(dataWithStatus);
            setTotalPages(Math.ceil(res.data.total / limit));
        } catch (err) {
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const toggleStatus = async (userId: string, currentStatus: "ACTIVE" | "INACTIVE") => {
        try {
            await axios.patch(
                `http://localhost:5000/api/v1/user/update-user/${userId}`,
                { status: currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE" },
                { withCredentials: true }
            );

            // Update local state
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userId
                        ? { ...user, status: currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
                        : user
                )
            );
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    if (loading)
        return <p className="text-center mt-10 text-gray-400">Loading users...</p>;

    return (
        <div className="p-4 flex flex-col items-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold text-pink-400 mb-6">All Users</h1>

            <div className="w-full overflow-x-auto max-w-6xl">
                <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left hidden sm:table-cell">Role</th>
                            <th className="px-4 py-3 text-left hidden sm:table-cell">Status</th>
                            <th className="px-4 py-3 text-left hidden sm:table-cell">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <motion.tr
                                key={user.id} // changed here
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-b border-gray-700 hover:bg-gray-700/50"
                            >
                                <td className="px-4 py-3">{user.name}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3 hidden sm:table-cell">{user.role}</td>
                                <td className="px-4 py-3 hidden sm:table-cell">
                                    {user.status === "ACTIVE" ? (
                                        <span className="text-green-400 font-bold">ACTIVE</span>
                                    ) : (
                                        <span className="text-red-400 font-bold">INACTIVE</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 hidden sm:table-cell">
                                    <button
                                        onClick={() => toggleStatus(user.id, user.status)} // changed here
                                        className={`px-2 py-1 rounded ${user.status === "ACTIVE"
                                                ? "bg-red-500 hover:bg-red-600"
                                                : "bg-green-500 hover:bg-green-600"
                                            } transition`}
                                    >
                                        {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex gap-4 mt-6 flex-wrap justify-center">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-pink-400 hover:bg-pink-500 disabled:opacity-50 transition"
                >
                    Previous
                </button>
                <span className="flex items-center gap-2">
                    Page <strong>{currentPage}</strong> of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-pink-400 hover:bg-pink-500 disabled:opacity-50 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
