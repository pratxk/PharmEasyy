import { useEffect, useState } from 'react'
import './App.css'
import AllRoutes from './Routes/AllRoutes'
import { useDispatch } from 'react-redux'
import { fetchCurrentUser, logout } from './redux/Actions/authActions'

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      dispatch(fetchCurrentUser())
        .unwrap()
        .catch(() => {
          dispatch(logout());
        });
    }
  }, [dispatch]);
  return (
    <>
      <AllRoutes />
    </>
  )
}

export default App
