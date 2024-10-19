import React, { useEffect } from 'react';
import Heading from '../../components/Skeleton/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, fetchCart } from '../../redux/Actions/cartActions';
import CartCard from './CartCard';
import MedicineCardSkeleton from '../../components/Skeleton/MedicineCardSkeleton';
import { useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import CartSummary from '../Checkout/CartSummary';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, isLoading, error } = useSelector((state) => state.cart);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);


  const handleCheckout = () => {
    toast({ description: 'Proceeding to checkout...', status: 'info', duration:1500 });
    // Add your checkout logic here
    setTimeout(() => {
      navigate('/checkout')
    }, 2000);
  };

  const handleDeleteCart = () => {
    dispatch(clearCart());
  }

  if (isLoading) {
    return <MedicineCardSkeleton />;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  return (
    <div className="overflow-hidden p-4 h-[100vh] bg-white ">
      <Heading
        text="Cart"
        textColor="primary"
        fromGradient="secondary"
        toGradient="primary"
      />
      <button className={`bg-red-500 text-white font-bold rounded-lg ${cart?.length > 0 ? 'block' : 'hidden'}  shadow-lg p-4 my-3`} onClick={handleDeleteCart}>Delete Cart</button> 
      <div className="flex justify-between items-start mb-4">
        {cart?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {cart.map((cartItem) => (
              <CartCard key={cartItem._id} cartItem={cartItem} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg mt-5">Your cart is empty.</p>
        )}
        {cart?.length > 0 && (
          <CartSummary cart={cart} handleCheckout={handleCheckout} checkout={true} />
        )}
      </div>
    </div>
  );
}
