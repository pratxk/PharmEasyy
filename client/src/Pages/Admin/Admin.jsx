import React, { useEffect, useState } from 'react'
import Heading from '../../components/Skeleton/Heading'
import MedicineCardSkeleton from '../../components/Skeleton/MedicineCardSkeleton'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedicines } from '../../redux/Actions/medicineActions';
import PharmacyCard from './components/Pharmacy_Comps/PharmacyCard';

function Admin() {
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({
        category: '',
        sort: '',
        minPrice: 0,
        maxPrice: 2000,
    });
    const { medicines, isLoading } = useSelector((state) => state.medicine);
     
    useEffect(() => {
        dispatch(fetchMedicines(filters));
    }, [dispatch, filters]);
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
                <MedicineCardSkeleton />
            ) : (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-3 place-items-center">
                    {medicines.map((ele) => (
                        <PharmacyCard
                            key={ele._id}
                            item={ele}
                        />
                    ))}
                </div>
            )}
        </div>
        </div>
        </>
    )
}

export default Admin