import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrdersTable = ({ data }) => {
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const navigate = useNavigate();

    const toggleOrderDetails = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    const handleUpdateClick = (orderId) => {
        navigate(`/admin/orders/${orderId}`); // Adjust the path to match your routing
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Order ID</th>
                        <th className="border border-gray-300 px-4 py-2">User</th>
                        <th className="border border-gray-300 px-4 py-2">Total Price</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                        <th className="border border-gray-300 px-4 py-2">View Items</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(order => (
                        <React.Fragment key={order._id}>
                            <tr onClick={() => toggleOrderDetails(order._id)} className="hover:bg-gray-50 cursor-pointer">
                                <td className="border text-black border-gray-300 px-4 py-2">{order._id}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {order.userId ? `${order.userId.first_name} ${order.userId.last_name}` : 'Deleted'}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.paymentStatus}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        className="hover:underline bg-green-600 rounded-lg text-white font-bold p-2"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent row click
                                            handleUpdateClick(order._id);
                                        }}
                                    >
                                        Update Order Status
                                    </button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <span
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() => toggleOrderDetails(order._id)}
                                    >
                                        View Items
                                    </span>
                                </td>
                            </tr>
                            {expandedOrderId === order._id && (
                                <tr>
                                    <td colSpan="7" className="border border-gray-300 px-4 py-2">
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
    );
};

export default OrdersTable;
