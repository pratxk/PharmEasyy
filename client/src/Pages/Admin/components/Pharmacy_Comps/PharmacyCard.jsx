import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteMedicine } from '../../../../redux/Actions/medicineActions';
import { useToast } from '@chakra-ui/react';

const PharmacyCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const handleUpdate = () => {
        navigate(`/admin/${item._id}`);
    };

    const handleDelete = async () => {
        const result = await dispatch(deleteMedicine(item._id));
        if (result.meta.requestStatus === 'fulfilled') {
            toast({ description: 'Item Deleted Successfully', status: 'success' });
        } else {
            toast({ description: 'Error deleting item', status: 'error' });
        }
    };

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-transform">
            <img className="w-full h-48 object-cover" src={item.imageUrl} alt={item.name} />
            <div className="p-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">Developed By: <span className="font-medium">{item.developedBy}</span></p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Category: <span className="font-medium">{item.category}</span></p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Max Expiry: <span className="font-medium">{item.maxMonthsExpiry} months</span></p>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${item.price.toFixed(2)}</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">Stock: <span className="font-medium">{item.stock > 0 ? item.stock : 'Out of Stock'}</span></p>
            </div>
            <div className="flex flex-col gap-3 p-5">
                <button className="bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-500 transition duration-200" onClick={handleUpdate}>
                    Update Medicine
                </button>
                <button className="bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-500 transition duration-200" onClick={handleDelete}>
                    Delete Medicine
                </button>
            </div>
        </div>
    );
};

export default PharmacyCard;
