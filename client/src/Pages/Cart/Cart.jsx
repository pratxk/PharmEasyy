import React, { useEffect } from 'react';
import Heading from '../../components/Skeleton/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, fetchCart } from '../../redux/Actions/cartActions';
import CartCard from './CartCard';
import MedicineCardSkeleton from '../../components/Skeleton/MedicineCardSkeleton';
import { useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import CartSummary from '../Checkout/CartSummary';
import EmptyCart from '../../assets/emptyCart.jpg';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, isLoading, error } = useSelector((state) => state.cart);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleCheckout = () => {
    toast({ description: 'Proceeding to checkout...', status: 'info', duration: 1500 });
    setTimeout(() => {
      navigate('/checkout');
    }, 2000);
  };

  const handleDeleteCart = async () => {
    try {
      await dispatch(clearCart()); // Await the clearCart dispatch
      toast({
        title: "Cart cleared successfully.",
        status: "success",
        duration: 1800,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      console.error(err); // Log the error if needed
      toast({
        title: "Error clearing cart.",
        description: "There was an issue while clearing the cart. Please try again.",
        status: "error",
        duration: 1800,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center flex-wrap">
        <MedicineCardSkeleton />
        <MedicineCardSkeleton />
        <MedicineCardSkeleton />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  return (
    <div className="overflow-hidden p-6 h-auto min-h-screen bg-gray-50">
      <Heading
        text="Your Cart"
        textColor="primary"
        fromGradient="secondary"
        toGradient="primary"
      />
      {cart?.length > 0 && (
        <button
          className="bg-red-500 text-white font-bold rounded-lg shadow-lg px-6 py-3 my-5 transition-all duration-300 ease-in-out hover:bg-red-600 hover:shadow-2xl active:scale-95"
          onClick={handleDeleteCart}
        >
          Delete Cart
        </button>
      )}
      <div className="flex flex-col lg:flex-row lg:space-x-8 justify-between items-start">
        {cart?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {cart.map((cartItem) => (
              <CartCard key={cartItem._id} cartItem={cartItem} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full text-center mt-10">
            <img src={EmptyCart} alt="Empty Cart" className="w-1/2 md:w-1/3 mb-4" />
            <p className="text-lg font-semibold text-gray-700">Your cart is empty.</p>
            <p className="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/medicines" className="mt-4 text-blue-500 hover:underline">
              <button className='p-3 hover:bg-green-500 text-gray-700 hover:text-white font-bold transition duration-200 rounded-md '>
                Start shopping now
              </button>
            </Link>
          </div>
        )}
        {cart?.length > 0 && (
          <div className="w-full lg:w-1/3 mt-6 lg:mt-0 bg-white p-6 rounded-lg shadow-lg">
            <CartSummary cart={cart} handleCheckout={handleCheckout} checkout={true} />
          </div>
        )}
      </div>
    </div>
  );
}
