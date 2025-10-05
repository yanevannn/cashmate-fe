import React, { useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
}

const initialCategories: Category[] = [
  { id: 1, name: "Food & Drink", description: "Pengeluaran sehari-hari untuk makan dan minum." },
  { id: 2, name: "Transportation", description: "Biaya transportasi, termasuk bensin dan tiket." },
  { id: 3, name: "Entertainment", description: "Biaya untuk hiburan, bioskop, atau langganan streaming." },
];

const CategoryManagement: React.FC = () => {
  const [categories] = useState<Category[]>(initialCategories);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Category Management</h1>
        <button
          onClick={() => console.log("Add Category")}
          className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-md"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add New Category
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{category.description}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-blue-600 hover:text-blue-900 mx-1 p-1 rounded-full hover:bg-blue-100">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 mx-1 p-1 rounded-full hover:bg-red-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManagement;
