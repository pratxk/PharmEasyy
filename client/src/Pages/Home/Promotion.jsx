import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Promotion() {
    return (
        <>
            <div className="w-full mt-10 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Buy Quickly from anywhere</h5>
                <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Stay up to date and buy medicines on PharmEasy on iOS & Android. Download the app today.</p>
                <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                    <a href="#" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <svg className="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                        <div className="text-left rtl:text-right">
                            <div className="mb-1 text-xs">Download on the</div>
                            <div className="-mt-1 font-sans text-sm font-semibold">Mac App Store</div>
                        </div>
                    </a>
                    <a href="#" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                        <svg className="me-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path></svg>
                        <div className="text-left rtl:text-right">
                            <div className="mb-1 text-xs">Get in on</div>
                            <div className="-mt-1 font-sans text-sm font-semibold">Google Play</div>
                        </div>
                    </a>
                </div>
            </div>

        </>
    )
}

export default Promotion









export function Promotion2() {
    const images = [
        'https://img.freepik.com/premium-photo/3d-illustration-very-happy-saudi-arab-doctor-waving-hands-ai-generated_705708-31030.jpg',
        'https://static.vecteezy.com/system/resources/previews/004/948/182/original/medicine-and-drugs-pills-set-collection-with-modern-flat-style-free-vector.jpg',
        'https://img.freepik.com/premium-vector/medical-drugs-pills-capsules-set-isolated-icon_316839-1870.jpg',
        'https://static.vecteezy.com/system/resources/previews/000/109/498/original/free-medical-vector.jpg'
        // Add more images as needed
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);  // Start fading out current image
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(true);  // Start fading in new image
            }, 300);  // Matches the fade-out duration
        }, 5000);  // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-screen">
            {/* Image with dark overlay */}
            <div
                className={`absolute inset-0 bg-center bg-no-repeat bg-cover transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
            ></div>
            <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div> {/* Dark overlay */}

            {/* Content */}
            <div className="relative px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 z-10">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                    We take care of the world’s potential
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                    Here at PharmEasy we focus on making and delivering the best medicines to keep your health maintained and top notch.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <Link
                        to="/medicines"
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gray-900 hover:bg-blue-950 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                    >
                        Get started
                        <svg
                            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                        </svg>
                    </Link>
                    <Link
                        to="/about"
                        className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                    >
                        Learn more
                    </Link>
                </div>
            </div>
        </section>
    );
}


export const PlanSection = () => {
    return (
        <>
            <section class="py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
                        <div class="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
                            <div class="mb-8">
                                <h3 class="text-2xl font-semibold text-white">Free</h3>
                                <p class="mt-4 text-gray-400">Get started with our basic features.</p>
                            </div>
                            <div class="mb-8">
                                <span class="text-5xl font-extrabold text-white">$0</span>
                                <span class="text-xl font-medium text-gray-400">/mo</span>
                            </div>
                            <ul class="mb-8 space-y-4 text-gray-400">
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>1 user account</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>10 transactions per month</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Basic support</span>
                                </li>
                            </ul>
                            <a href="#" class="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                Sign Up
                            </a>
                        </div>

  
                        <div class="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
                            <div class="mb-8">
                                <h3 class="text-2xl font-semibold text-white">Starter</h3>
                                <p class="mt-4 text-gray-400">Perfect for small businesses and startups.</p>
                            </div>
                            <div class="mb-8">
                                <span class="text-5xl font-extrabold text-white">$49</span>
                                <span class="text-xl font-medium text-gray-400">/mo</span>
                            </div>
                            <ul class="mb-8 space-y-4 text-gray-400">
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>5 user accounts</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>100 transactions per month</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Standard support</span>
                                </li>
                            </ul>
                            <a href="#" class="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                Get Started
                            </a>
                        </div>

     
                        <div class="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
                            <div class="mb-8">
                                <h3 class="text-2xl font-semibold text-white">Pro</h3>
                                <p class="mt-4 text-gray-400">Ideal for growing businesses and enterprises.</p>
                            </div>
                            <div class="mb-8">
                                <span class="text-5xl font-extrabold text-white">$99</span>
                                <span class="text-xl font-medium text-gray-400">/mo</span>
                            </div>
                            <ul class="mb-8 space-y-4 text-gray-400">
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Unlimited user accounts</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Unlimited transactions</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Priority support</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Advanced analytics</span>
                                </li>
                            </ul>
                            <a href="#" class="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                Get Started
                            </a>
                        </div>

                  
                        <div class="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
                            <div class="mb-8">
                                <h3 class="text-2xl font-semibold text-white">Enterprise</h3>
                                <p class="mt-4 text-gray-400">Tailored for large-scale deployments and custom needs.</p>
                            </div>
                            <div class="mb-8">
                                <span class="text-5xl font-extrabold text-white">Custom</span>
                            </div>
                            <ul class="mb-8 space-y-4 text-gray-400">
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Dedicated infrastructure</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Custom integrations</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Dedicated support team</span>
                                </li>
                                <li class="flex items-center">
                                    <svg class="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Premium SLAs</span>
                                </li>
                            </ul>
                            <a href="#" class="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                                Contact Sales
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}