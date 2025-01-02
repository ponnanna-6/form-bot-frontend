import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Login, Home, Settings, Workspace, FormSetup, FormFill} from './pages'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem('token'));
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={!userLoggedIn ? <Home setUserLoggedIn={setUserLoggedIn}/> : <Workspace setUserLoggedIn={setUserLoggedIn}/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/form/:formId' element={<FormSetup />} />
        <Route path='/form/share/:formId' element={<FormFill />} />
      </Routes>
      <ToastContainer
        limit={1}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  )
}

export default App
