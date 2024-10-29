import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../redux/Actions/orderActions';
import Heading from '../../../components/Skeleton/Heading';
import OrdersTable from './OrdersTable';
import OrdersSkeleton from '../../../components/Skeleton/OrderSkeleton';

function Orders() {
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector((state) => state.order);

    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 8;

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const totalPages = Math.ceil(orders?.length / ordersPerPage);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders?.slice(indexOfFirstOrder, indexOfLastOrder) || [];

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='overflow-hidden p-5 h-[100vh]'>
            <Heading
                text={"All Orders"}
                textColor={"primary"}
                fromGradient={"secondary"}
                toGradient={"primary"}
            />

            {isLoading ? (
                <OrdersSkeleton />
            ) : error ? (
                <p>Error: {error}</p>
            ) : currentOrders.length > 0 ? (
                <>
                    <OrdersTable data={currentOrders} />
                    <div className="flex justify-center mt-4">
                        <button 
                            onClick={handlePrevPage} 
                            disabled={currentPage === 1} 
                            className="mx-1 p-2 border rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300">
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`mx-1 p-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button 
                            onClick={handleNextPage} 
                            disabled={currentPage === totalPages} 
                            className="mx-1 p-2 border rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300">
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p>No orders available.</p>
            )}
        </div>
    );
}

export default Orders;
