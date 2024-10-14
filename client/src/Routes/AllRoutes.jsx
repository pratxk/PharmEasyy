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

const router = createBrowserRouter([
    {
        path:'/',
        element:<HomeWrapper val={false}/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'/medicines',
                element:<HomeWrapper val={true}/>,
                children:[
                    {
                        path:":id",
                        element:<SingleMedicine/>
                    },
                    {
                        index:true,
                        element:<Medicine/>
                    }
                ]
            },
            {
                path:'/cart',
                element:<HomeWrapper val={true}/>,
                children:[
                    {
                        index:true,
                        element:<PrivateRoute><Cart/></PrivateRoute>
                    }
                ]
            },
            {
                path:'/about',
                element:<HomeWrapper val={true}/>,
                children:[
                    {
                        index:true,
                        element:<About/>
                    }
                ]
            },
            {
                path:'/login',
                element:<HomeWrapper val={true}/>,
                children:[
                    {
                        index:true,
                        element:<Login/>
                    }
                ]
            },
            {
                path:'/register',
                element:<HomeWrapper val={true}/>,
                children:[
                    {
                        index:true,
                        element:<SignUp/>
                    }
                ]
            },
            {
                path:'/profile',
                element:<HomeWrapper val={true}/>,
                children:[
                    {
                        index:true,
                        element:<PrivateRoute><Profile/></PrivateRoute>
                    }
                ]
            },
            {
                path:'/contact',
                element:<HomeWrapper val={true}/>,
                children:[
                    {
                        index:true,
                        element:<Contacts/>
                    }
                ]
            },
        ]
    }
])

const AllRoutes = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default AllRoutes