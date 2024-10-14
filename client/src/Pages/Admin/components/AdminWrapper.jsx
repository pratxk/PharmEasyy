import { Outlet } from 'react-router-dom'
import Footer from './Head_Foot/Footer'
import AdminHeader from './Head_Foot/Header'

function AdminWrapper({val}) {
  return (
   <>
   {!val && <AdminHeader/>}
   <Outlet />
   {!val && <Footer/>}
   </>
  )
}

export default AdminWrapper