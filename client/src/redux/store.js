import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import medicineSlice from './slices/medicineSlice'
import cartSlice from './slices/cartSlice'
import orderSlice from './slices/orderSlice'

const store = configureStore({
    reducer:{
        auth:authSlice,
        medicine:medicineSlice,
        cart:cartSlice,
        order:orderSlice
    }
})

export default store