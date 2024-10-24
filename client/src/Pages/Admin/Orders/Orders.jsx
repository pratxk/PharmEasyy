import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../redux/Actions/orderActions';
import Heading from '../../../components/Skeleton/Heading';
import OrdersTable from './OrdersTable';
import OrdersSkeleton from '../../../components/Skeleton/OrderSkeleton';

function Orders() {
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector((state) => state.order); // Include isLoading from state

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    console.log(orders);

    return (
        <div className='overflow-hidden p-5 h-[100vh]'>
            <Heading
                text={"All Orders"}
                textColor={"primary"}
                fromGradient={"secondary"}
                toGradient={"primary"}
            />

            {isLoading ? (
                <OrdersSkeleton /> // Show the skeleton while loading
            ) : error ? (
                <p>Error: {error}</p> // Display error message if any
            ) : orders && orders.length > 0 ? (
                <OrdersTable data={orders} />
            ) : (
                <p>No orders available.</p>
            )}
        </div>
    );
}

export default Orders;
