import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleMedicine, updateMedicine } from '../../../redux/Actions/medicineActions';
import { Spinner, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateMedicine = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();

    const singleMedicine = useSelector((state) => state.medicine.singleMedicine);
    const isLoading = useSelector((state) => state.medicine.isLoading);

    const [formData, setFormData] = useState({
        name: '',
        developedBy: '',
        maxMonthsExpiry: '',
        category: '',
        imageUrl: '',
        stock: '',
        price: '',
        file: null, // For file uploads
    });

    const [errors, setErrors] = useState({});
    const [isFileUpload, setIsFileUpload] = useState(true); // true for file upload, false for link submission

    useEffect(() => {
        const fetchMedicine = async () => {
            await dispatch(fetchSingleMedicine(id));
        };
        fetchMedicine();
    }, [dispatch, id]);

    useEffect(() => {
        if (singleMedicine) {
            setFormData({
                ...singleMedicine,
                file: null, // Reset file on load
            });
            setIsFileUpload(false); // Default to link submission
        }
    }, [singleMedicine]);

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
        setFormData((prevData) => ({
            ...prevData,
            file: e.target.files[0],
            imageUrl: '', // Clear imageUrl when file is selected
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        const { name,  imageUrl, maxMonthsExpiry, stock, price } = formData;

        // Validate name
        if (!/^(?!.*\b\d+\b)[A-Za-z0-9\-]+$/.test(name)) {
            newErrors.name = 'Medicine name must be a valid word without numbers between words.';
        }

        // Validate maxMonthsExpiry: must be a positive integer
        if (!/^\d+$/.test(maxMonthsExpiry) || maxMonthsExpiry <= 0) {
            newErrors.maxMonthsExpiry = 'Max Months Expiry must be a positive number.';
        }

        // Validate stock: must be a positive integer
        if (!/^\d+$/.test(stock) || stock <= 0) {
            newErrors.stock = 'Stock must be a positive number.';
        }

        // Validate price: must be a valid number (can be an integer or decimal)
        if (isNaN(price) || price <= 0) {
            newErrors.price = 'Price must be a positive number.';
        }

        // Validate imageUrl if link submission is selected
        if (!isFileUpload && !/^https?:\/\/.+\..+/.test(imageUrl)) {
            newErrors.imageUrl = 'Image URL must be a valid URL.';
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
    
        const formDataToSubmit = new FormData();
        
        // Append other fields
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'file' && value) {
                formDataToSubmit.append('imageUrl', value); // Change 'file' to 'imageUrl'
            } else {
                formDataToSubmit.append(key, value);
            }
        });
    
    
        try {
            const result = await dispatch(updateMedicine({ id, updates: formDataToSubmit }));
            if (result.meta.requestStatus === 'fulfilled') {
                toast({ description: 'Medicine updated successfully', status: 'success' });
                navigate('/admin');
            }
        } catch (error) {
            console.error('Error updating medicine:', error);
            toast({ description: 'Failed to update medicine. Please try again.', status: 'error' });
        }
    };
    
    
    if (isLoading) {
        return <><Spinner/></> // Optional loading state
    }

    return (
        <div className="bg-white border rounded-lg shadow relative m-10">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">Update Medicine</h3>
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

                        <div className="flex items-center mb-4 col-span-6 sm:col-span-3">
                            <label className="mr-4">Upload Image:</label>
                            <input 
                                type="radio" 
                                name="imageOption" 
                                checked={isFileUpload} 
                                onChange={() => setIsFileUpload(true)} 
                            /> File
                            <input 
                                type="radio" 
                                name="imageOption" 
                                checked={!isFileUpload} 
                                onChange={() => setIsFileUpload(false)} 
                            /> Link
                        </div>

                        {isFileUpload ? (
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="file" className="text-sm font-medium text-gray-900 block mb-2">Image Upload</label>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                />
                                {errors.file && <p className="text-red-500 text-xs">{errors.file}</p>}
                            </div>
                        ) : (
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
                        <button className="text-white bg-gray-950 hover:bg-gray-900 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Update Medicine</button>
                        <button className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => navigate('/admin')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMedicine;
