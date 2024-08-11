import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";

const Navbar = ({serverurl}) => {

    const signout = ()=>{
        sessionStorage.setItem('token',['false'])
    }

    const [isDashboard,setIsdashboard] = useState('NO')
    const [isEmployee,setIsEmployee] = useState('NO')
    const [isleavecntrl,setLeavecntrl] = useState("NO")
    const [isAttendance,setIsAttendance] = useState("NO")
    const [isHoliday,setIsHoliday] = useState("NO")

    useEffect(()=>{
      const get_features = async () =>{
        const response = await fetch(`${serverurl}/getfeatures`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({"roleid":atob(sessionStorage.getItem('token')).split(",")[2]})
        })
        const result = await response.json()
        setIsdashboard(result[0][0])
        setIsEmployee(result[0][1])
        setLeavecntrl(result[0][2])
        setIsAttendance(result[0][3])
        setIsHoliday(result[0][4])
      }
      get_features()
    },[serverurl,])

  return (
    <nav className="navbar">
        <div className='links'>
            {(isDashboard==="YES")?<div><h2><Link to='/Home/'>Dashboard</Link></h2></div>:""}
            {(isEmployee==="YES")?<div><h2><Link to='/Home/Employee'>Employee Control</Link></h2></div>:""}
            {(isleavecntrl==="YES")?<div><h2><Link to='/Home/Leave'>Leave Control</Link></h2></div>:""}
            {(isAttendance==="YES")?<div><h2><Link to='/Home/Attendance'>Attendance Details</Link></h2></div>:""}
            {(isHoliday==="YES")?<div><h2><Link to='/Home/Holiday'>Holiday Control</Link></h2></div>:""}
        </div>
        <div className='Empdetails'>
            <span>Welcome, {atob(sessionStorage.getItem('token')).split(",")[1]}</span>
            <div><Link to="/" onClick={signout}><IoIosLogOut className='logoutbtn'/></Link></div>
        </div>
    </nav>
  )
}

export default Navbar