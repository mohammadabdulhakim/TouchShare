import React, { useEffect } from 'react'
import Login from './components/Login'
import Home from './pages/Home'
// import { GoogleOAuthProvider } from '@react-oauth/google';
import {Routes,Route,useNavigate} from 'react-router-dom'
import { fetchUser } from './utils/fetchUser'

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();

    if(!user) navigate('/login')
  }, [])
  

  return (
    // <GoogleOAuthProvider
    // clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
    // >
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/*' element={<Home/>}/>
      </Routes>
    // </GoogleOAuthProvider>
  )
}

export default App