import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartQuantity, removeMedicineFromCart, addMedicineToCart } from '../../redux/Actions/cartActions';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const MedicineCard = ({ item, inCart, quantity }) => {
    const { isAuth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const handleAddToCart = () => {
        if (isAuth) {
            if (inCart) {
                toast({ description: 'Item already added to cart', status: 'info' });
            } else {
                dispatch(addMedicineToCart({
                    medicineId: item._id,
                    quantity: 1,
                    name: item.name,
                    developedBy: item.developedBy,
                    maxMonthsExpiry: item.maxMonthsExpiry,
                    category: item.category,
                    imageUrl: item.imageUrl,
                    price: item.price,
                })).then((result) => {
                    if (result.meta.requestStatus === 'fulfilled') {
                        toast({ description: 'Item added to cart', status: 'success' , isClosable:true, position:'top-right', duration:1000});
                    }
                });
            }
        } else {
            toast({ description: 'Please login to add item to cart', status: 'error', duration:2000,  position:'top-right' });
            navigate('/login');
        }
    };

    const handleIncrement = () => {
        dispatch(updateCartQuantity({ cartItemId: item._id, operation: 'increment' }));
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            dispatch(updateCartQuantity({ cartItemId: item._id, operation: 'decrement' }));
        }
    };

    const handleRemoveFromCart = () => {
        dispatch(removeMedicineFromCart(item._id));
        toast({ description: 'Item removed from cart', status: 'info' });
    };

    return (
        <div
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:border-gray-300"
            key={item.id}
        >
            <img
                className="pb-4 rounded-t-lg w-full transition-all duration-300 ease-in-out hover:scale-90"
                src={item.imageUrl}
                alt={item.name}
            />
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{item.name}</h5>
                <p className="text-sm text-gray-900">Developed By: {item.developedBy}</p>
                <p className="text-sm text-gray-900">
                    <b>Category</b>: {item.category}
                </p>
                <p className="text-sm text-gray-900">
                    <b>Max Expiry</b>: {item.maxMonthsExpiry} months
                </p>
                <span className="text-2xl font-bold text-gray-900">
                    <b>Price: </b>${item.price}
                </span>
                <div className="flex items-center justify-between mt-2">
                    {+item.stock > 0 ? (
                        <button
                            onClick={handleAddToCart}
                            className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-300 ease-in-out"
                        >
                            Add to cart
                        </button>
                    ) : (
                        <span className="text-sm font-bold text-red-500">Out of Stock</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MedicineCard;
