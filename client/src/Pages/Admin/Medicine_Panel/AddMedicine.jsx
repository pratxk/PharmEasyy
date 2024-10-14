import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addMedicine } from '../../../redux/Actions/medicineActions';
import { useToast } from '@chakra-ui/react';

const AddMedicine = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: '',
        developedBy: '',
        maxMonthsExpiry: '',
        category: '',
        imageUrl: '',
        stock: '',
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(addMedicine(formData))
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    toast({ description: 'Item added to Database', status: 'success' });
                }
            });
            setFormData({
                name: '',
                developedBy: '',
                maxMonthsExpiry: '',
                category: '',
                imageUrl: '',
                stock: '',
                price: ''
            });
        } catch (error) {
            console.error('Error adding medicine:', error);
        }
    };

    return (
        <div className="bg-white border rounded-lg shadow relative m-10">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">Add Medicine</h3>
            </div>

            <div className="p-6 space-y-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">Medicine Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="Aspirin"
                                required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="developedBy" className="text-sm font-medium text-gray-900 block mb-2">Developed By</label>
                            <input
                                type="text"
                                name="developedBy"
                                id="developedBy"
                                value={formData.developedBy}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="Company Name"
                                required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="maxMonthsExpiry" className="text-sm font-medium text-gray-900 block mb-2">Max Months Expiry</label>
                            <input
                                type="number"
                                name="maxMonthsExpiry"
                                id="maxMonthsExpiry"
                                value={formData.maxMonthsExpiry}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="12"
                                required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="category" className="text-sm font-medium text-gray-900 block mb-2">Category</label>
                            <input
                                type="text"
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="Pain Reliever"
                                required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="imageUrl" className="text-sm font-medium text-gray-900 block mb-2">Image URL</label>
                            <input
                                type="text"
                                name="imageUrl"
                                id="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="stock" className="text-sm font-medium text-gray-900 block mb-2">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="100"
                                required
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Price</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="$20"
                                required
                            />
                        </div>
                    </div>
                    <div className="p-6 border-t border-gray-200 rounded-b">
                        <button className="text-white bg-gray-950 hover:bg-gray-900 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Add Medicine</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMedicine;
