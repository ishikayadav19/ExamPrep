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
// import ViewSession from './pages/admin/ViewSession'
import ExamineeDashboard from './pages/user/ExamineeDashboard'
import QuestionBank from './pages/admin/QuestionBank'
import Examination from './pages/admin/Examination'
import   ResultReport from './pages/admin/ResultReport'
import ResultDeclaration from './pages/admin/ResultDeclaration'
import MyExams from './pages/user/MyExams'



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
        <Route path="questionBank" element={<QuestionBank/>}></Route> {/* QuestionBank component Route kr rhe yha  */}
        <Route path="examination" element={<Examination/>}></Route> {/* Examination component Route kr rhe yha  */}
        <Route path="resultReport" element={<ResultReport/>}></Route> {/* ResultReport component Route kr rhe yha  */}
        <Route path="resultDeclaration" element={<ResultDeclaration/>}></Route> {/* ResultDeclaration component Route kr rhe yha  */}
        </Route> {/* Session component Route kr rhe yha  */}
        <Route path ="/examinee/" element={<ExamineeDashboard/>}>
          {/* ExamineeDashboard component Route kr rhe yha  */}
          <Route path="profile" element={<Examinee/>}></Route> {/* Profile component Route kr rhe yha  */}
          <Route path="myexams" element={<MyExams/>}></Route> {/* MyExams component Route kr rhe yha  */}
          {/* <Route path="scheduled" element={<ScheduledExams/>}></Route> ScheduledExams component Route kr rhe yha  */}
          {/* <Route path="result" element={<Result/>}></Route> Result component Route kr rhe yha  */}
          {/* <Route path="change-password" element={<ChangePassword/>}></Route> ChangePassword component Route kr rhe yha  */}
        </Route>
      </Routes>
     </Router>
    </>
  )
}

export default App
