import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../redux/Actions/orderActions';
import Heading from '../../../components/Skeleton/Heading';
import OrdersTable from './OrdersTable';

function Orders() {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    console.log(orders);

    return (
        <>
            <div className='overflow-hidden p-4'>
                <Heading
                    text={"All Orders"}
                    textColor={"primary"}
                    fromGradient={"secondary"}
                    toGradient={"primary"}
                />
                {orders && orders.length > 0 ? (
                    <OrdersTable data={orders} />
                ) : (
                    <p>No orders available.</p>
                )}
            </div>
        </>
    );
}

export default Orders;
