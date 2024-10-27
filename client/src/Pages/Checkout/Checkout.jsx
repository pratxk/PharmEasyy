import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartSummary from './CartSummary';
import { fetchCart } from '../../redux/Actions/cartActions';
import { addOrder } from '../../redux/Actions/orderActions';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();
    const { cart } = useSelector((state) => state.cart);
    const [formData, setFormData] = useState({
        cardholderName: '',
        cardNumber: '',
        expiration: '',
        cvv: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        const newErrors = { ...errors };

        switch (name) {
            case 'cardholderName':
                formattedValue = value.toUpperCase().replace(/[^A-Z\s]/g, ''); // Convert to uppercase and remove special chars
                if (formattedValue.length === 0) {
                    newErrors.cardholderName = 'Cardholder name is required';
                } else if (!/^[A-Z\s]+$/.test(formattedValue)) {
                    newErrors.cardholderName = 'Cardholder name should contain uppercase letters only.';
                } else {
                    delete newErrors.cardholderName; // Clear error if valid
                }
                break;


            case 'cardNumber':
                formattedValue = value.replace(/\D/g, '').slice(0, 12); // Numbers only, max length 12
                if (formattedValue.length !== 12) {
                    newErrors.cardNumber = 'Card Number must be exactly 12 digits.';
                } else {
                    delete newErrors.cardNumber;
                }
                break;

                case 'expiration':
                    // Basic format: MM/YY
                    formattedValue = value; // Keep user-entered format
                
                    // Check if the format matches MM/YY
                    const expirationPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
                
                    if (!expirationPattern.test(formattedValue)) {
                        newErrors.expiration = 'Enter a valid expiration in MM/YY format.';
                    } else {
                        const [month, year] = formattedValue.split('/');
                        const currentYear = new Date().getFullYear() % 100;
                
                        if (parseInt(year, 10) < currentYear) {
                            newErrors.expiration = 'Year cannot be in the past.';
                        } else {
                            delete newErrors.expiration;
                        }
                    }
                    break;
                

            case 'cvv':
                formattedValue = value.replace(/\D/g, '').slice(0, 3); // Numbers only, max length 3
                if (formattedValue.length !== 3) {
                    newErrors.cvv = 'CVV must be exactly 3 digits.';
                } else {
                    delete newErrors.cvv;
                }
                break;

            default:
                break;
        }

        setFormData({ ...formData, [name]: formattedValue });
        setErrors(newErrors);
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (Object.keys(errors).length === 0) {
            try {
                const result = await dispatch(addOrder());

                if (result.meta.requestStatus === 'fulfilled') {
                    toast({
                        title: 'Order placed!',
                        description: 'Your order has been successfully placed.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate('/');
                } else {
                    throw new Error('Order failed');
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
        } else {
            toast({
                title: 'Validation Error',
                description: 'Please fix the errors in the form.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    if (cart?.length === 0) {
        alert('Cart is Empty');
        navigate('/');
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
                                        {errors.cardholderName && <p className="text-red-500 text-sm">{errors.cardholderName}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
                                        <input
                                            id="card-number"
                                            name="cardNumber"
                                            type="text"
                                            placeholder="Card Number"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            className="mt-1 px-4 py-3.5 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                                            required
                                        />
                                        {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
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
                                            {errors.expiration && <p className="text-red-500 text-sm">{errors.expiration}</p>}
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
                                            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="mt-8 mb-8 w-40 py-3.5 text-sm bg-black text-white font-bold rounded-md hover:bg-gray-900 tracking-wide">Pay</button>
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
