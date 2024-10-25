import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteMedicine } from '../../../../redux/Actions/medicineActions';
import { useToast } from '@chakra-ui/react';
import ConfirmationModal from '../../../../components/ConfirmationModal';

const PharmacyCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpdate = () => {
        navigate(`/admin/update/${item._id}`);
    };

    const handleDelete = async () => {
        const result = await dispatch(deleteMedicine(item._id));
        if (result.meta.requestStatus === 'fulfilled') {
            toast({ description: 'Item Deleted Successfully', status: 'success', duration: 2800 });
        } else {
            toast({ description: 'Error deleting item', status: 'error', duration: 2800 });
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className="w-full max-w-sm bg-white border dark:bg-gray-800 border-gray-200 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:border-gray-300"
            >
                <img className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-90" src={item.imageUrl} alt={item.name} />
                <div className="p-5 text-gray-900 dark:text-white">
                    <h5 className="text-xl font-semibold tracking-tight ">{item.name}</h5>
                    <p className="text-sm">Developed By: <span className="font-medium">{item.developedBy}</span></p>
                    <p className="text-sm ">Category: <span className="font-medium">{item.category}</span></p>
                    <p className="text-sm ">Max Expiry: <span className="font-medium">{item.maxMonthsExpiry} months</span></p>
                    <span className="text-3xl font-bold ">${item.price.toFixed(2)}</span>
                    <p className="text-sm ">Stock: <span className="font-medium">{item.stock > 0 ? item.stock : 'Out of Stock'}</span></p>
                </div>
                <div className="flex flex-col gap-3 p-5">
                    <button className="bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-500 transition duration-200 transform hover:scale-105" onClick={handleUpdate}>
                        Update Medicine
                    </button>
                    <button className="bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-500 transition duration-200 transform hover:scale-105" onClick={openModal}>
                        Delete Medicine
                    </button>
                </div>
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={() => {
                    handleDelete();
                    closeModal();
                }}
                title="Delete Confirmation"
                description={`Are you sure you want to delete ${item.name}? This action cannot be undone.`}
            />
        </>
    );
};

export default PharmacyCard;
