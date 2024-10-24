import React, { useEffect, useState } from 'react';
import CarouselCustom from '../../components/CustomCarousel';
import Heading from '../../components/Skeleton/Heading';
import MedicineCard from './MedicineCard';
import { useDispatch, useSelector } from 'react-redux';
import MedicineCardSkeleton from '../../components/Skeleton/MedicineCardSkeleton';
import { fetchMedicines } from '../../redux/Actions/medicineActions';
import { fetchCart } from '../../redux/Actions/cartActions';
import { categoryList } from './PlaceholderData';
import { setCurrentPage } from '../../redux/slices/medicineSlice';
import Pagination from '../../components/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';

function Medicine() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const initialPage = parseInt(query.get('page')) || 1;
    const initialLimit = parseInt(query.get('limit')) || 5;

    const { medicines, isLoading, total, limit } = useSelector((state) => state.medicine);
    const cart = useSelector((state) => state.cart.cart);
    const [medicinesWithCartInfo, setMedicinesWithCartInfo] = useState([]);

    const [filters, setFilters] = useState({
        category: '',
        sort: '',
        minPrice: 0,
        maxPrice: 2000,
        limit: initialLimit,
        page: initialPage,
    });

    useEffect(() => {
        dispatch(fetchMedicines(filters));
        dispatch(fetchCart());
    }, [dispatch, filters]);

    useEffect(() => {
        const updatedMedicines = medicines.map((medicine) => {
            const cartItem = cart?.items?.find(item => item.medicineId._id === medicine._id);
            return {
                ...medicine,
                inCart: !!cartItem,
                quantity: cartItem ? cartItem.quantity : 0,
            };
        });
        setMedicinesWithCartInfo(updatedMedicines);
    }, [cart, medicines]);

    useEffect(() => {
        // Update the URL with the current page and limit
        const params = new URLSearchParams(filters);
        navigate({ search: params.toString() });
    }, [filters, navigate]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
            page: 1, // Reset to first page on filter change
        }));
    };

    const handlePageChange = (newPage) => {
        setFilters((prev) => ({
            ...prev,
            page: newPage,
        }));
        dispatch(setCurrentPage(newPage));
    };

    const totalPages = Math.ceil(total / limit);

    return (
        <>
            <CarouselCustom />
            <Heading
                text={"All Medicines"}
                textColor={"primary"}
                fromGradient={"secondary"}
                toGradient={"primary"}
            />
            <div className="flex flex-col md:flex-row justify-between mb-4 px-12">
                <select
                    name="category"
                    onChange={handleFilterChange}
                    className="border rounded p-2 mb-2 md:mb-0"
                >
                    <option value="">Select Category</option>
                    {categoryList.map((ele) => (
                        <option key={ele.id} value={ele.id}>{ele.name}</option>
                    ))}
                </select>

                <select
                    name="sort"
                    onChange={handleFilterChange}
                    className="border rounded p-2 mb-2 md:mb-0"
                >
                    <option value="">Sort By</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="inStock">In Stock</option>
                    <option value="-inStock">Out of Stock</option>
                </select>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center flex-wrap">
                    <MedicineCardSkeleton />
                    <MedicineCardSkeleton />
                    <MedicineCardSkeleton />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 place-items-center">
                    {medicinesWithCartInfo.length > 0 ? (
                        medicinesWithCartInfo.map((ele) => (
                            <MedicineCard
                                key={ele._id}
                                item={ele}
                                inCart={ele.inCart}
                                quantity={ele.quantity}
                            />
                        ))
                    ) : (
                        <p>No medicines found</p>
                    )}
                </div>
            )}

            <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}

export default Medicine;
