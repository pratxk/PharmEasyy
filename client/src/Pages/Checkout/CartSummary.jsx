import React from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({ cart, handleCheckout, checkout }) => {
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
    };

    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4  w-full  ">
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

                className={`mt-auto w-full bg-black text-white font-bold py-2 rounded hover:bg-gray-900 ${checkout ? 'block' : 'hidden'}`}
            >
              
                    Proceed to Checkout
                
            </button>
        </div>
    );
};

export default CartSummary;
