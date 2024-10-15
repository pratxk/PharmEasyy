import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartQuantity, removeMedicineFromCart, addMedicineToCart } from '../../redux/Actions/cartActions';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const MedicineCard = ({ item, inCart, quantity }) => {
    const { isAuth } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const naviagte = useNavigate();
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
                        toast({ description: 'Item added to cart', status: 'success' });
                    }
                });
            }
        }
        else{
            toast({ description: 'Please login to add item to cart', status: 'error' });
            naviagte('/login')
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
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                <Link to={`/medicine/${item._id}`}>
                    <img className="p-5 rounded-t-lg w-[50%]" src={item.imageUrl} alt={item.name} />
                </Link>
                <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{item.name}</h5>
                    <p className="text-sm text-gray-900 dark:text-gray-900">Developed By: {item.developedBy}</p>
                    <p className="text-sm text-gray-900 dark:text-gray-900"><b>Category</b>: {item.category}</p>
                    <p className="text-sm text-gray-900 dark:text-gray-900"><b>Max Expiry</b>: {item.maxMonthsExpiry} months</p>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${item.price}</span>
                    <div className="flex items-center justify-between mt-2">
                        {
                            +item.stock > 0 ? (
                                <button onClick={handleAddToCart} className="text-white bg-black hover:bg-black-800 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-black dark:focus:ring-black-800">
                                    Add to cart
                                </button>
                            ) : (
                                <span className="text-sm font-bold text-red-500">Out of Stock</span>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    };

    export default MedicineCard;
