import React, { useEffect, useState } from 'react';
import { fetchOrdersByUser } from '../../redux/Actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

const Orders_User = () => {
  const dispatch = useDispatch();
  const { userOrders, isLoading, error } = useSelector((state) => state.order);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchOrdersByUser());
  }, [dispatch]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

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
            {userOrders?.map((order, index) => (
              <React.Fragment key={order._id}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleOrderDetails(order._id)}
                >
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                </tr>
                {expandedOrderId === order._id && (
                  <tr>
                    <td colSpan="4" className="border border-gray-300 px-4 py-2">
                      <div className="bg-gray-50 p-2 rounded-md">
                        <h5 className="font-bold">Items:</h5>
                        <ul className="list-disc list-inside">
                          {order.items.map(item => (
                            <li key={item._id}>
                              <div>
                                <span className="font-semibold">{item.medicineId.name}</span> - 
                                ${item.price.toFixed(2)} (Qty: {item.quantity})
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders_User;
