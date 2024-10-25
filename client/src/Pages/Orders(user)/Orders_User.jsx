import React, { useEffect, useState } from 'react';
import { fetchOrdersByUser  } from '../../redux/Actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import OrdersSkeleton from '../../components/Skeleton/OrderSkeleton';
import NoOrders from '../../assets/NoOrders.jpg';
import { useNavigate } from 'react-router-dom';

const Orders_User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { userOrders, isLoading, error } = useSelector((state) => state.order);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    dispatch(fetchOrdersByUser ());
  }, [dispatch]);

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Render error message
  if (error) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        {error === 'No orders found' ? 'Error: ' : ''} {error}
      </div>
    );
  }

  // Render orders
  return (
    <>
      {
        isLoading ? (
          <OrdersSkeleton />
        ) : (
          userOrders?.length > 0 ? (
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
                          <td className="border border-gray-300 px-4 py-2">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                        </tr>

                        {expandedOrderId === order._id && (
                          <tr>
                            <td colSpan="4" className="border border-gray-300 px-4 py-2">
                              <div className="bg-gray-50 p-2 rounded-md">
                                <h5 className="font-bold">Items:</h5>
                                <ul className="list-disc list-inside">
                                  {order.items.map((item) => (
                                    <li key={item._id}>
                                      <div>
                                        <span className="font-semibold">{item.medicineId.name}</span> - $
                                        {item.price.toFixed(2)} (Qty: {item.quantity})
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
          ) : (
            <div className="flex flex-col items-center justify-center h-[100vh] text-center">
              <img src={NoOrders} alt="No Orders" className="w-[300px] h-[300px] object-cover mb-4" />
              <h1 className="text-3xl font-bold mb-2">No Orders Yet</h1>
              <p className="text-gray-600">Looks like you haven't placed any orders yet.</p>
              <button onClick={()=>navigate('/medicines')} className="bg-gray-300 text-gray-900 hover:bg-green-500 hover:text-white font-bold py-2 px-4 mt-4 transition duration-200 rounded">
                Start Shopping
              </button>
            </div>
          )
        )
      }
    </>
  );
};

export default Orders_User;