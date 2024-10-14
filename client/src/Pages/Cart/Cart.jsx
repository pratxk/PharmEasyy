import React, { useEffect } from 'react';
import Heading from '../../components/Skeleton/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../redux/Actions/cartActions';
import CartCard from './CartCard';
import MedicineCardSkeleton from '../../components/Skeleton/MedicineCardSkeleton';
import { useToast } from '@chakra-ui/react';

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, isLoading, error } = useSelector((state) => state.cart);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const calculateTotal = () => {
    return cart?.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2);
  };

  const handleCheckout = () => {
    toast({ description: 'Proceeding to checkout...', status: 'info' });
    // Add your checkout logic here
  };

  if (isLoading) {
    return <MedicineCardSkeleton />;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  return (
    <div className="overflow-hidden p-4">
      <Heading
        text="Cart"
        textColor="primary"
        fromGradient="secondary"
        toGradient="primary"
      />
      <div className="flex justify-between items-start mb-4">
        {cart?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cart.map((cartItem) => (
              <CartCard key={cartItem._id} cartItem={cartItem} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg mt-5">Your cart is empty.</p>
        )}
        {cart?.length > 0 && (
          <div className="flex flex-col bg-white shadow-md rounded-lg p-4 ml-4 w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-2">Cart Summary</h2>
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th className="text-left">Item</th>
                  <th className="text-right">Qty</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td className="py-2">{item.name}</td>
                    <td className="text-right">{item.qty}</td>
                    <td className="text-right">${(item.price * item.qty).toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td>Total</td>
                  <td></td>
                  <td className="text-right">${calculateTotal()}</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleCheckout}
              className="mt-auto w-full bg-primary text-white font-bold py-2 rounded bg-black hover:bg-gray-900"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
