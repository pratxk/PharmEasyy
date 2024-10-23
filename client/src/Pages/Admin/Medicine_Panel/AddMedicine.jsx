import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMedicine } from '../../../redux/Actions/medicineActions';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AddMedicine = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: '',
        developedBy: '',
        maxMonthsExpiry: '',
        category: '',
        stock: '',
        price: '',
        imageUrl: '',
    });
    const [errors, setErrors] = useState({});
    const [uploadMethod, setUploadMethod] = useState('file'); // Track upload method
    const [selectedFile, setSelectedFile] = useState(null); // State for selected file

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Clear error on change
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file); // Store the selected file
            setFormData((prevData) => ({
                ...prevData,
                imageUrl: '', // Clear imageUrl if a file is selected
            }));
        }
    };

    const handleUploadMethodChange = (method) => {
        setUploadMethod(method);
        setFormData((prevData) => ({
            ...prevData,
            imageUrl: '', // Reset imageUrl when changing method
        }));
        setSelectedFile(null); // Clear selected file if changing to URL input
    };

    const validateForm = () => {
        const newErrors = {};
        const { name, developedBy, category, maxMonthsExpiry, stock, price } = formData;

        // Ensure only one of imageUrl or file is filled
        if (uploadMethod === 'file' && !selectedFile) {
            newErrors.imageUrl = 'Please upload an image file.';
        } else if (uploadMethod === 'url' && !/^https?:\/\/.+\..+/.test(formData.imageUrl)) {
            newErrors.imageUrl = 'Please enter a valid URL.';
        }

        // Validate other fields...
        if (!/^(?!.*\b\d+\b)[A-Za-z0-9\-]+$/.test(name)) {
            newErrors.name = 'Medicine name must be a valid word without numbers between words.';
        }
        if (!/^[A-Za-z\s]{3,}$/.test(developedBy)) {
            newErrors.developedBy = 'Company name must be at least 3 letters.';
        }
        if (!/^[A-Za-z\s]{3,}$/.test(category)) {
            newErrors.category = 'Category must be at least 3 letters.';
        }
        if (!/^\d+$/.test(maxMonthsExpiry) || maxMonthsExpiry <= 0) {
            newErrors.maxMonthsExpiry = 'Max Months Expiry must be a positive number.';
        }
        if (!/^\d+$/.test(stock) || stock <= 0) {
            newErrors.stock = 'Stock must be a positive number.';
        }
        if (!/^\d+(\.\d{1,2})?$/.test(price) || price <= 0) {
            newErrors.price = 'Price must be a valid number.';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Stop submission if errors exist
        }

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('developedBy', formData.developedBy);
        formDataToSend.append('maxMonthsExpiry', formData.maxMonthsExpiry);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('stock', formData.stock);
        formDataToSend.append('price', formData.price);
        
        if (uploadMethod === 'file' && selectedFile) {
            formDataToSend.append('medicine_img', selectedFile);
        } else if (uploadMethod === 'url') {
            formDataToSend.append('imageUrl', formData.imageUrl);
        }

        try {
            const result = await dispatch(addMedicine(formDataToSend));
            if (result.meta.requestStatus === 'fulfilled') {
                toast({ description: 'Item added to Database', status: 'success' });
                setFormData({
                    name: '',
                    developedBy: '',
                    maxMonthsExpiry: '',
                    category: '',
                    imageUrl: '',
                    stock: '',
                    price: ''
                });
                setSelectedFile(null); // Clear selected file
            }
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
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
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
                            {errors.developedBy && <p className="text-red-500 text-xs">{errors.developedBy}</p>}
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
                            {errors.maxMonthsExpiry && <p className="text-red-500 text-xs">{errors.maxMonthsExpiry}</p>}
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
                            {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
                        </div>
                        
                        {/* Upload Method Selection */}
                        <div className="col-span-6">
                            <label className="text-sm font-medium text-gray-900 block mb-2">Upload Method</label>
                            <div className="flex gap-4">
                                <label>
                                    <input
                                        type="radio"
                                        checked={uploadMethod === 'file'}
                                        onChange={() => handleUploadMethodChange('file')}
                                    />
                                    Upload File
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        checked={uploadMethod === 'url'}
                                        onChange={() => handleUploadMethodChange('url')}
                                    />
                                    Enter URL
                                </label>
                            </div>
                        </div>
                        
                        {/* Image Upload or URL Input */}
                        {uploadMethod === 'file' && (
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="imageUpload" className="text-sm font-medium text-gray-900 block mb-2">Image Upload</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    required
                                />
                                {errors.imageUrl && <p className="text-red-500 text-xs">{errors.imageUrl}</p>}
                            </div>
                        )}
                        
                        {uploadMethod === 'url' && (
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
                                {errors.imageUrl && <p className="text-red-500 text-xs">{errors.imageUrl}</p>}
                            </div>
                        )}
                        
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
                            {errors.stock && <p className="text-red-500 text-xs">{errors.stock}</p>}
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
                            {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
                        </div>
                    </div>
                    <div className="p-6 border-t border-gray-200 flex gap-3 rounded-b">
                        <button className="text-white bg-gray-950 hover:bg-gray-900 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Add Medicine</button>
                        <button className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => navigate('/admin')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMedicine;
