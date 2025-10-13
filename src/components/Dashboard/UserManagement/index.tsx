import React, { useEffect, useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

interface User {
  id: number;
  username: string;
  email: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_URL}/user`;
  const token = localStorage.getItem("access_token");

  // Fetch Users
  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Fetched users:", data);
        setUsers(data.data || []);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Delete User
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // console.log("Delete response:", data);

      if (response.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        alert(`Failed to delete user: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          User Management
        </h1>
        <button
          onClick={() => console.log("Add User")}
          className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-md"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add New User
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="text-blue-600 hover:text-blue-900 mx-1 p-1 rounded-full hover:bg-blue-100">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleDelete(user.id)}
                    className={`text-red-600 hover:text-red-900 mx-1 p-1 rounded-full hover:bg-red-100 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="text-center text-gray-500 py-6 text-sm"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
