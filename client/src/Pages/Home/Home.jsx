import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import mobileMockup from '../../assets/mobile.png';
import { Link } from 'react-router-dom'
import { FaShoppingBag } from "react-icons/fa";
import MedicineCard from '../Medicines/MedicineCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedicines } from '../../redux/Actions/medicineActions';
import MedicineCardSkeleton from '../../components/Skeleton/MedicineCardSkeleton';
import Promotion, { PlanSection, Promotion2 } from './Promotion';
import Heading from '../../components/Skeleton/Heading';


function Home() {
    const dispatch = useDispatch();
    const { medicines, isLoading } = useSelector((state) => state.medicine);


    useEffect(() => {
        dispatch(fetchMedicines());
    }, [dispatch]);
    return (
        <>
            <div className="overflow-hidden relative p-4">
                {/* SVG Background */}
                <div className="absolute inset-0 z-[-1]">
                    <svg
                        className="w-full h-[990px] animate-wave"
                        viewBox="0 0 500 200"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0"
                            fill="#020617"
                        ></path>
                    </svg>

                </div>
                <div className="container mx-auto h-full flex flex-col lg:flex-row items-center justify-between px-8 py-16 lg:py-0 text-neutral">
                    <div className="lg:w-1/2 mb-8 lg:mb-0 p-5 text-white">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                            PHARMEASY <span className="text-secondary">E-Store</span>
                        </h1>
                        <p className="text-lg mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            ultricies elit in urna euismod, sit amet luctus felis commodo.
                        </p>
                        <button className="p-4 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition duration-300 flex items-center gap-2">
                            <Link to="/medicines">Let's Start Shopping </Link>
                            <span>
                                <FaShoppingBag />
                            </span>
                        </button>
                    </div>

                    <div className="lg:w-[300px] flex justify-center py-12">
                        <img
                            src={mobileMockup}
                            alt="Mobile mockup"
                            className="w-[300px] md:w-[300px] lg:w-[450px] drop-shadow-lg"
                        />
                    </div>
                </div>
               

                <Heading
                    text={"Top Sellers"}
                    textColor={"primary"}
                    fromGradient={"secondary"}
                    toGradient={"primary"}
                />

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center mt-3'>

                    {
                        isLoading ? (<>
                            <MedicineCardSkeleton />
                            <MedicineCardSkeleton />
                            <MedicineCardSkeleton />
                            <MedicineCardSkeleton />
                        </>) :
                            (
                                medicines.slice(0, 3).map((ele) => (
                                    <MedicineCard item={ele} key={ele.id} />
                                ))
                            )
                    }
                </div>

                <br />
                <br />
                <br />
                <br />
                <Promotion2 />
                <br />
                <br />
                <br />
                <br />
                
                <Heading
                    text={"Subscriptions"}
                    textColor={"primary"}
                    fromGradient={"secondary"}
                    toGradient={"primary"}
                />
                <br />
                <br />
                <PlanSection />

                <br />
                <br />
                <br />
                <br />
                <Promotion />
                <br />
                <br />
                <br />
            </div>
        </>
    )

}

export default Home