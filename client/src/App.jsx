import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AllRoutes from './Routes/AllRoutes'
import { fetchCurrentUser } from './redux/Actions/authActions'
import { useDispatch } from 'react-redux'

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();

    useEffect(() => {
        // Fetch current user when the app loads
        dispatch(fetchCurrentUser());
    }, [dispatch]);

  return (
    <>
      <AllRoutes/>
    </>
  )
}

export default App
