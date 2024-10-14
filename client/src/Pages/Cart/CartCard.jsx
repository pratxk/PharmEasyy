import React from 'react';
import { useDispatch } from 'react-redux';
import { removeMedicineFromCart, updateCartQuantity } from '../../redux/Actions/cartActions';
import { Link } from 'react-router-dom';

const CartCard = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { _id, imageUrl, name, price, qty, developedBy, maxMonthsExpiry, category } = cartItem;

  // Handle increment quantity
  const handleIncrement = () => {
    dispatch(updateCartQuantity({ cartItemId: _id, operation: 'increment' })); // Use operation
  };

  // Handle decrement quantity, ensuring it doesn't go below 1
  const handleDecrement = () => {
    if (qty > 1) {
      dispatch(updateCartQuantity({ cartItemId: _id, operation: 'decrement' })); // Use operation
    }
  };

  // Handle remove item from cart
  const handleRemoveFromCart = () => {
    dispatch(removeMedicineFromCart(_id));
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
      <Link to={`/medicine/${_id}`} className="block">
        <img
          className="p-5 rounded-t-lg w-[50%] mx-auto"
          src={imageUrl}
          alt={name}
        />
      </Link>
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Developed By: {developedBy || 'N/A'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <strong>Category</strong>: {category || 'N/A'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <strong>Max Expiry</strong>: {maxMonthsExpiry || 'N/A'} months
        </p>
        <div className="flex items-center justify-between flex-wrap mt-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${price.toFixed(2)}
          </span>
          <div className="flex items-center my-1 gap-2 flex-wrap">
            <button
              onClick={handleDecrement}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-4 text-white font-bold">{qty}</span> {/* Updated to display qty */}
            <button
              onClick={handleIncrement}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r"
              aria-label="Increase quantity"
            >
              +
            </button>
            <button
              onClick={handleRemoveFromCart}
              className="ml-3 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
              aria-label="Remove item from cart"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
