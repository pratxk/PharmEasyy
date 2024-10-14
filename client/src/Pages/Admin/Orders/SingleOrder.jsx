import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleOrder, updateOrderStatus } from '../../../redux/Actions/orderActions';

const SingleOrder = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleOrderItem, isLoading, error } = useSelector((state) => state.order);
    const [newStatus, setNewStatus] = useState(singleOrderItem?.status || "Pending");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        dispatch(fetchSingleOrder(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (singleOrderItem) {
            setNewStatus(singleOrderItem.status);
        }
    }, [singleOrderItem]);

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };

    const handleUpdateStatus = () => {
        setUpdating(true);
        dispatch(updateOrderStatus({ id, status: newStatus }))
            .unwrap()
            .then(() => {
                dispatch(fetchSingleOrder(id));
                setUpdating(false);
            })
            .catch(() => {
                setUpdating(false);
            });
    };

    if (isLoading || updating) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    }

    return (
        <section className="max-w-2xl m-10 mx-auto p-10 bg-white rounded-2xl shadow-md h-[100vh]">
            <header className="text-left mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Order ID: {singleOrderItem._id}</h1>
                <div className="mt-2">
                    <h2 className="text-lg">Current Status:
                        <span className={`font-semibold ${singleOrderItem.status === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
                            {singleOrderItem.status}
                        </span>
                    </h2>
                    <h2 className="text-lg">Payment Status:
                        <span className={`font-semibold ${singleOrderItem.paymentStatus === "Paid" ? "text-green-500" : "text-red-500"}`}>
                            {singleOrderItem.paymentStatus}
                        </span>
                    </h2>
                </div>
            </header>
            <article>
                <h3 className="text-2xl font-semibold mb-4">Ordered Items</h3>
                <ul className="space-y-4">
                    {singleOrderItem.items?.map(item => (
                        <li key={item._id} className="flex justify-between items-center border-b pb-2">
                            <div>
                                <h4 className="font-semibold text-lg text-blue-600">{item.medicineId.name}</h4>
                                <p className="font-bold text-black">Quantity: {item.quantity}</p>
                            </div>
                            <span className="text-lg font-bold text-black">${item.price.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </article>
            <footer className="mt-6">
                <div>
                    <h3 className="text-xl font-semibold">Update Order Status</h3>
                    <select
                        value={newStatus}
                        onChange={handleStatusChange}
                        className="mt-2 p-2 border rounded"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>
                <div>
                    <button
                        onClick={handleUpdateStatus}
                        className="mt-4 bg-gray-950 font-bold text-white p-2 rounded hover:bg-gray-700"
                    >
                        Update Status
                    </button>
                </div>
            </footer>
        </section>
    );
};

export default SingleOrder;
