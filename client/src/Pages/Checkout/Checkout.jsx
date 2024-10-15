import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartSummary from './CartSummary';
import { fetchCart } from '../../redux/Actions/cartActions';
import { addOrder } from '../../redux/Actions/orderActions';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Checkout = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate(); // Initialize useNavigate
    const { cart, isLoading, error } = useSelector((state) => state.cart);
    const [formData, setFormData] = useState({
        cardholderName: '',
        cardNumber: '',
        expiration: '',
        cvv: '',
    });

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        console.log("Payment Info:", formData);
    
        try {
            const result = await dispatch(addOrder()); // Await the dispatch
    
            // Check if the order was fulfilled successfully
            if (result.meta.requestStatus === 'fulfilled') {
                toast({
                    title: 'Order placed!',
                    description: 'Your order has been successfully placed.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/'); // Redirect to home page
            } else {
                throw new Error('Order failed'); // Throw error if not fulfilled
            }
        } catch (error) {
            toast({
                title: 'Order failed',
                description: 'Something went wrong. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    
    if(cart?.length  === 0){
        alert('Cart is Empty');
        navigate('/')
    } 

    return (
        <div className='overflow-hidden p-4 h-[100vh] m-32'>
            <div className="font-sans bg-white p-8 shadow-xl">
                <div className="md:max-w-5xl max-w-xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 max-md:order-1">
                            <h2 className="text-3xl font-extrabold text-gray-800">Make a Payment</h2>
                            <p className="text-gray-800 text-sm mt-4">
                                Complete your transaction swiftly and securely with our easy-to-use payment process.
                            </p>

                            <form className="mt-8 max-w-lg" onSubmit={handlePayment}>
                                <div className="grid gap-4">
                                    <div>
                                        <label htmlFor="cardholder-name" className="block text-sm font-medium text-gray-700">Cardholder's Name</label>
                                        <input
                                            id="cardholder-name"
                                            name="cardholderName"
                                            type="text"
                                            placeholder="Cardholder's Name"
                                            value={formData.cardholderName}
                                            onChange={handleChange}
                                            className="mt-1 px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                                            required
                                        />
                                    </div>

                                    <div className="flex bg-gray-100 border rounded-md focus-within:border-purple-500 overflow-hidden">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 ml-3" viewBox="0 0 32 20">
                                            <circle cx="10" cy="10" r="10" fill="#f93232" />
                                            <path fill="#fed049" d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z" />
                                        </svg>
                                        <input
                                            id="card-number"
                                            name="cardNumber"
                                            type="text"
                                            placeholder="Card Number"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            className="mt-1 px-4 py-3.5 text-gray-800 w-full text-sm outline-none bg-transparent"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">EXP.</label>
                                            <input
                                                id="expiration"
                                                name="expiration"
                                                type="text"
                                                placeholder="MM/YY"
                                                value={formData.expiration}
                                                onChange={handleChange}
                                                className="mt-1 px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                                            <input
                                                id="cvv"
                                                name="cvv"
                                                type="text"
                                                placeholder="CVV"
                                                value={formData.cvv}
                                                onChange={handleChange}
                                                className="mt-1 px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="mt-8 w-40 py-3.5 text-sm bg-black text-white font-bold rounded-md hover:bg-gray-900 tracking-wide">Pay</button>
                            </form>
                        </div>

                        <div className="bg-gray-100 p-6 rounded-md shadow-lg max-w-md">
                            {cart?.length > 0 && (
                                <CartSummary cart={cart} handleCheckout={null} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
