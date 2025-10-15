import { Edit, PlusCircle } from "lucide-react";

const TransactionManagement = () => (
  <div className="p-6 bg-white rounded-2xl shadow-lg text-gray-400 text-center">
    <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
        Transaction Management
      </h1>
      <button
        onClick={() => console.log("Add Transaction")}
        className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-md"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add New Transaction
      </button>
    </div>
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Transaction ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Date
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="hover:bg-blue-50 transition">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
              TXN123456
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">$150.00</td>
            <td className="px-6 py-4 text-sm text-gray-600">2024-06-15</td>
            <td className="px-6 py-4 text-center">
              <button className="text-blue-600 hover:text-blue-900 mx-1 p-1 rounded-full hover:bg-blue-100">
                <Edit className="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default TransactionManagement;
