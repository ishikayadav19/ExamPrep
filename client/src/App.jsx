import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Dashboard from './pages/admin/Dashboard'
import Subject from './pages/admin/Subject'
import Examinee from './pages/admin/Examinee'
import Session from './pages/admin/Session'
import 'animate.css';
import AdminLogin from './pages/admin/AdminLogin'
import ViewSession from './pages/admin/ViewSession'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <Routes>
        {/*registration Route*/}
        <Route path="/" element={<Home/>}></Route> {/* Home component Route */}
        <Route path="/register" element={<Registration/>}></Route> {/* Registration component Route */}
        <Route path='/adlogin' element={<AdminLogin/>}></Route>
        <Route path="/login" element={<Login/>}></Route> {/* Login component Route kr rhe yha  */}
        <Route path="/admin/" element={<Dashboard/>}>{/*  component Route kr rhe yha  */}
        <Route path="subject" element={<Subject/>}></Route> {/* Subject component Route kr rhe yha  */}
        <Route path="examinee" element={<Examinee/>}></Route> {/* Examinee component Route kr rhe yha  */}
       
        <Route path="session" element={<Session/>}></Route>
        </Route> {/* Session component Route kr rhe yha  */}
      </Routes>
     </Router>
    </>
  )
}

export default App
