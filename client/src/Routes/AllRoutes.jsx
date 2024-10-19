import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeWrapper from './HomeWrapper'
import Home from '../Pages/Home/Home'
import SingleMedicine from '../Pages/Single_Meds/SingleMedicine'
import Medicine from '../Pages/Medicines/Medicine'
import Cart from '../Pages/Cart/Cart'
import About from '../Pages/About/About'
import Login from '../Pages/Auth/Login'
import SignUp from '../Pages/Auth/SignUp'
import PrivateRoute from '../components/PrivateRoute/PrivateRoute'
import Profile from '../Pages/Profile/Profile'
import Contacts from '../Pages/Contacts/Contacts'
import Checkout from '../Pages/Checkout/Checkout'
import Admin from '../Pages/Admin/Admin'
import RoleBasedRoute from '../components/PrivateRoute/RoleBasedRoute'
import Orders from '../Pages/Admin/Orders/Orders'
import AdminWrapper from '../Pages/Admin/components/AdminWrapper'
import SingleOrder from '../Pages/Admin/Orders/SingleOrder'
import AddMedicine from '../Pages/Admin/Medicine_Panel/AddMedicine'
import UpdateMedicine from '../Pages/Admin/Medicine_Panel/UpdateMedicine'

import User from '../Pages/Admin/Users/User'
import AdminProfile from '../Pages/Admin/Profile/AdminProfile'


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeWrapper />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/medicines',
                element: <Medicine />,
                children: [
                    {
                        path: ":id",
                        element: <SingleMedicine />
                    }
                ]
            },
            {
                path: '/cart',
                element: <PrivateRoute><Cart /></PrivateRoute>
            },
            {
                path: '/checkout',
                element: <HomeWrapper val={true} />,
                children: [
                    {
                        index: true,
                        element: <PrivateRoute><Checkout /></PrivateRoute>
                    }
                ]
            },
            {
                path: '/about',
                element: <HomeWrapper val={true} />,
                children: [
                    {
                        index: true,
                        element: <About />
                    }
                ]
            },
            {
                path: '/login',
                element: <HomeWrapper val={true} />,
                children: [
                    {
                        index: true,
                        element: <Login />
                    }
                ]
            },
            {
                path: '/register',
                element: <HomeWrapper val={true} />,
                children: [
                    {
                        index: true,
                        element: <SignUp />
                    }
                ]
            },
            {
                path: '/profile',
                element: <HomeWrapper val={true} />,
                children: [
                    {
                        index: true,
                        element: <PrivateRoute><Profile /></PrivateRoute>
                    }
                ]
            },
            {
                path: '/contact',
                element: <HomeWrapper val={true} />,
                children: [
                    {
                        index: true,
                        element: <Contacts />
                    }
                ]
            },
        ]
    },
    {
        path: '/admin',
        element: <RoleBasedRoute allowedRoles={['admin']}><AdminWrapper /></RoleBasedRoute>,
        children: [
            {
                index: true,
                element: <Admin />
            },
            {
                path: '/admin/:id',
                element: <UpdateMedicine />,
            },
            {
                path: '/admin/profile',
                element: <AdminProfile />,
            },
            {
                path: '/admin/users',
                element:<User/>
            },
            {

                path: '/admin/orders',
                element: <Orders />,
            },
            {
                path:'/admin/orders/:id',
                element:<SingleOrder/>
            },
            {
                path:'/admin/add-medicine',
                element:<AddMedicine/>
            }
        ]
    },
])

const AllRoutes = () => {
    return <RouterProvider router={router}></RouterProvider>
}

export default AllRoutes