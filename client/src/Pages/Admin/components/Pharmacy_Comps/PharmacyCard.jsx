import React from 'react';
import { Link } from 'react-router-dom';

const PharmacyCard = ({ item }) => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/medicine/${item._id}`}>
                <img className="p-5 rounded-t-lg w-[50%]" src={item.imageUrl} alt={item.name} />
            </Link>
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">Developed By: {item.developedBy}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400"><b>Category</b>: {item.category}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400"><b>Max Expiry</b>: {item.maxMonthsExpiry} months</p>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${item.price}</span>
                <p className="text-sm text-gray-500 dark:text-gray-400"><b>Stock:</b> {item.stock > 0 ? item.stock : 'Out of Stock'}</p>
            </div>
        </div>
    );
};

export default PharmacyCard;
