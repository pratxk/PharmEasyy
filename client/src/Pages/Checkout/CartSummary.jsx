import React from 'react';

const CartSummary = ({ cart, handleCheckout, checkout }) => {
  // Calculate total cost of all items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 w-full max-w-xs mx-auto lg:mx-0 lg:w-80">
      <h2 className="text-xl font-bold mb-4">Cart Summary</h2>

      <table className="w-full mb-6">
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
          <tr className="font-bold border-t border-gray-300">
            <td className="pt-2">Total</td>
            <td></td>
            <td className="text-right text-black pt-2">${calculateTotal()}</td>
          </tr>
        </tbody>
      </table>

      {checkout && (
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white font-bold py-2 rounded hover:bg-gray-900 transition-all duration-200 ease-in-out"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartSummary;
