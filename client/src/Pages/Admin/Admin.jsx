import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Heading from '../../components/Skeleton/Heading';
import MedicineCardSkeleton from '../../components/Skeleton/MedicineCardSkeleton';
import { fetchMedicines } from '../../redux/Actions/medicineActions';
import PharmacyCard from './components/Pharmacy_Comps/PharmacyCard';
import Pagination from '../../components/Pagination';
import { fetchCurrentUser } from '../../redux/Actions/authActions';

function Admin() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const query = new URLSearchParams(location.search);
    const initialPage = parseInt(query.get('page')) || 1;
    const initialLimit = parseInt(query.get('limit')) || 5;

    const [filters, setFilters] = useState({
        category: '',
        sort: '',
        minPrice: 0,
        maxPrice: 2000,
        limit: initialLimit,
        page: initialPage,
    });

    const { medicines, isLoading, total } = useSelector((state) => state.medicine);

    useEffect(() => {
        dispatch(fetchMedicines(filters));
        // Update the URL with the current page and limit
        const params = new URLSearchParams(filters);
        navigate({ search: params.toString() }); // Use navigate instead of history.replace
    }, [dispatch, filters, navigate]);

    const handlePageChange = (newPage) => {
        setFilters((prev) => ({
            ...prev,
            page: newPage,
        }));
    };

    useEffect(() => {
        // Fetch current user when the app loads
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    const totalPages = Math.ceil(total / filters.limit); // Calculate total pages

    return (
        <>
            <div className='p-4 overflow-hidden'>
                <Heading
                    text={"All Medicines"}
                    textColor={"primary"}
                    fromGradient={"secondary"}
                    toGradient={"primary"}
                />
                <div>
                    {isLoading ? (

                        <div className="flex justify-center items-center flex-wrap">
                            <MedicineCardSkeleton />
                            <MedicineCardSkeleton />
                            <MedicineCardSkeleton />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-3 place-items-center">
                            {medicines.length > 0 ? (
                                medicines.map((ele) => (
                                    <PharmacyCard
                                        key={ele._id}
                                        item={ele}
                                    />
                                ))
                            ) : (
                                <p>No medicines found</p>
                            )}
                        </div>
                    )}
                </div>
                <Pagination
                    currentPage={filters.page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
}

export default Admin;
