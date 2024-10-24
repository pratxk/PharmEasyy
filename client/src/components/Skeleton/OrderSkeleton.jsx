import React from 'react';

const OrdersSkeleton = () => {
  return (
    <div className="p-4 h-[100vh]">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Sr. No.</th>
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Render multiple skeleton rows */}
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="border border-gray-300 px-4 py-2">
                  <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersSkeleton;
