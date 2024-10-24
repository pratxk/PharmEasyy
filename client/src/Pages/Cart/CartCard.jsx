import React from 'react';
import { useDispatch } from 'react-redux';
import { removeMedicineFromCart, updateCartQuantity } from '../../redux/Actions/cartActions';

const CartCard = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { _id, imageUrl, name, price, qty, developedBy, maxMonthsExpiry, category } = cartItem;

  // Handle increment quantity
  const handleIncrement = () => {
    dispatch(updateCartQuantity({ cartItemId: _id, operation: 'increment' }));
  };

  // Handle decrement quantity, ensuring it doesn't go below 1
  const handleDecrement = () => {
    if (qty > 1) {
      dispatch(updateCartQuantity({ cartItemId: _id, operation: 'decrement' }));
    }
  };

  // Handle remove item from cart
  const handleRemoveFromCart = () => {
    dispatch(removeMedicineFromCart(_id));
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
      <img
        className="pb-4 rounded-t-lg w-full h-[250px] object-cover"
        src={imageUrl}
        alt={name}
      />

      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
          {name}
        </h5>
        <p className="text-sm text-gray-700 mb-1">
          Developed By: {developedBy || 'N/A'}
        </p>
        <p className="text-sm text-gray-700 mb-1">
          <strong>Category</strong>: {category || 'N/A'}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Max Expiry</strong>: {maxMonthsExpiry || 'N/A'} months
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrement}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l transition-all duration-150 ease-in-out"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 text-black font-bold">{qty}</span>
            <button
              onClick={handleIncrement}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r transition-all duration-150 ease-in-out"
              aria-label="Increase quantity"
            >
              +
            </button>
            <button
              onClick={handleRemoveFromCart}
              className="ml-3 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition-all duration-150 ease-in-out"
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
