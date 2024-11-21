"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEdit, FaComments } from "react-icons/fa";
import BackendApi from "../../../components/BackendApi";
import AdminLayout from "../../../components/AdminLayout";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BackendApi}/allUsers`);
        const fetchedUsers = response.data || [];
        setUsers(fetchedUsers.reverse());
        setFilteredUsers(fetchedUsers.reverse()); // Initialize filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    router.push({
      pathname: "/cc/admin/adminUserdetails",
      query: { user: JSON.stringify(user) },
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(query) ||
        user.lastname.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  return (
    <AdminLayout>
      <div className="bg-gray-900 min-h-screen">
        <div>
          {/* Header */}
          <div className="mb-5">
            <h1 className="text-black text-2xl font-bold">Users</h1>
          </div>

          {/* Search Input */}
          <div className="mb-5">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 rounded-lg border border-black2 bg-gray-800 text-black"
            />
          </div>

          {/* Table for Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left bg-gray-700 text-black">ID</th>
                  <th className="p-3 text-left bg-gray-700 text-black">Name</th>
                  <th className="p-3 text-left bg-gray-700 text-black">
                    Email
                  </th>
                  <th className="p-3 text-left bg-gray-700 text-black">
                    Balance
                  </th>
                  <th className="p-3 text-left bg-gray-700 text-black">
                    Status
                  </th>
                  <th className="p-3 text-left bg-gray-700 text-black">Edit</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-700 transition duration-300"
                    >
                      <td className="p-3 text-black">{user._id.slice(-5)}</td>
                      <td className="p-3 text-black">
                        {user.firstname} {user.lastname}
                      </td>
                      <td className="p-3 text-black">{user.email}</td>
                      <td className="p-3 text-black">{user.totalBalance}</td>
                      <td className="p-3 flex items-center">
                        <span
                          className={`h-3 w-3 rounded-full mr-2 ${
                            user.status === "verified" ? "bg-green" : "bg-red"
                          }`}
                        ></span>
                        {user.status}
                      </td>
                      <td className="p-3">
                        <FaEdit
                          onClick={() => handleEditClick(user)}
                          className="cursor-pointer text-bluey hover:text-blue-600"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center p-3 text-gray-400 italic"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards for Mobile */}
          <div className="md:hidden space-y-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="p-4 bg-gray-800 rounded-lg shadow-lg"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="text-lg text-black font-semibold">
                      {user.firstname} {user.lastname}
                    </h3>
                    <div className="flex items-center">
                      <FaEdit
                        onClick={() => handleEditClick(user)}
                        className="cursor-pointer text-bluey text-lg"
                      />
                    </div>
                  </div>
                  <p className="text-black text-sm">ID: {user._id.slice(-5)}</p>
                  <p className="text-black text-sm">Email: {user.email}</p>
                  <p className="text-black text-sm">
                    Balance: {user.totalBalance}
                  </p>
                  <p className="text-black text-sm">
                    Status:{" "}
                    <span
                      className={`inline-block h-3 w-3 rounded-full ${
                        user.status === "verified" ? "bg-green" : "bg-red"
                      }`}
                    ></span>{" "}
                    {user.status}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic text-center">No users found</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
