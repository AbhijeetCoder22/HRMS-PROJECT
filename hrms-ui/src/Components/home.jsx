import React from 'react'
import Navbar from './Navbar'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './Home_Components/Dashboard'
import Employeemanagent from './Home_Components/Employeemanagent'
import Leave from './Home_Components/Leave'
import Attendance from './Home_Components/Attendance'
import Holiday from './Home_Components/Holiday'

const Home = ({serverurl}) => {

  return (
    <div className='Home'>
      <Navbar serverurl={serverurl}/>
      <Routes>
        <Route path='/' element={<Dashboard serverurl={serverurl}/>}/>
        <Route path='/Employee' element={<Employeemanagent serverurl={serverurl}/>}/>
        <Route path='/Leave' element={<Leave serverurl={serverurl}/>}/>
        <Route path='/Attendance' element={<Attendance serverurl={serverurl}/>}/>
        <Route path="/Holiday" element={<Holiday serverurl={serverurl}/>}/>
      </Routes>
    </div>
  )
}

export default Home