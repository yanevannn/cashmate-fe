import type React from "react";


const TypeBadge: React.FC<{ type: string }> = ({ type }) => {
  if (type === "income") {
    return (
      <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
        Income
      </span>
    );
  } else if (type === "expense") {
    return (
      <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
        Expense
      </span>
    );
  } else {
    return (
      <span className="inline-block px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">
        Unknown
      </span>
    );
  }
};

export default TypeBadge;