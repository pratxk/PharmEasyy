import { Outlet } from 'react-router-dom'
import Header from '../components/HEAD_FOOT/Header'
import Footer from '../components/HEAD_FOOT/Footer'

function HomeWrapper({val}) {
  return (
   <>
   {!val && <Header/>}
   <Outlet />
   {!val && <Footer/>}
   </>
  )
}

export default HomeWrapper