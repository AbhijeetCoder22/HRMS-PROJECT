import React, { useState } from 'react'
import Attendancecalender from './Attendancecalender'

const Submitattendance = ({serverurl}) => {

    const [refresh,setRefresh] = useState(0)

    const empid = Number(atob(sessionStorage.getItem('token')).split(",")[3])
    const place = {
        '1':'Office',
        '2':'Home',
        '3':'Client Location'
    }
    const [msg,setMsg] = useState('')
    const url = serverurl
    const [elisible,setElisible] = useState(true)

    const submitattendances = async (val) => {
        if (elisible){
            const get_place = place[val]
            const response = await fetch(`${url.serverurl}/submitattendance`,{
                method:'POST',
                headers: {'Content-Type' : 'application/json'},
                body:JSON.stringify({empid,get_place})
            })
            const result = await response.json()
            if(result){
                setRefresh(refresh+1)
                setMsg(result)
            }
        }
        else{
            setElisible(false)
            setMsg('ALREADY SUBMITTED !!!')
        }
    }

    const calculateDaysInMonth = (year, month,day) => {
        if (day ===0){
            return new Date(year, month, 0).getDate();
        }
        else{
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days[new Date(year,month-1,day).getDay()];
        }
      };

      const vanishmsg = ()=>{
        setMsg('')
      }

    const getCurrentMonth = () => {
        const date = new Date()
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June', 
          'July', 'August', 'September', 'October', 'November', 'December'
        ]
        const no_of_days = calculateDaysInMonth(date.getFullYear(),date.getMonth()+1,0)
        return [months[date.getMonth()],date.getFullYear(),no_of_days,date.getMonth()+1]
      }

    const getMonths = (val) => {
        const date = new Date()
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June', 
          'July', 'August', 'September', 'October', 'November', 'December'
        ]
        const no_of_days = calculateDaysInMonth(date.getFullYear(),date.getMonth()-val+1,0)
        return [months[date.getMonth()-val],date.getFullYear(),no_of_days,date.getMonth()-val+1]
      }

  return (
    <div className='Submitattendance' onClick={vanishmsg}>
        <div>
            <h2>Working From</h2>
            <div className='msg'>{msg}</div>
            <span>
            <span className='bcred' onClick={()=>{submitattendances(1)}}>Office</span>
            <span className='bcyellow' onClick={()=>{submitattendances(2)}}>Home</span>
            <span className='bcgreen' onClick={()=>{submitattendances(3)}}>Client Location</span>
            </span>
            <div className='underline'></div>
        </div>
        <div>
            <h2>Submitted Attendance</h2>
            <div className='calenders'>
                    <Attendancecalender getmonth={getCurrentMonth} calculateDaysInMonth={calculateDaysInMonth} serverurl={serverurl} refresh={refresh}/>
                    <Attendancecalender getmonth={getMonths} calculateDaysInMonth={calculateDaysInMonth} val={1} serverurl={serverurl} refresh={refresh}/>
                    <Attendancecalender getmonth={getMonths} calculateDaysInMonth={calculateDaysInMonth} val={2} serverurl={serverurl} refresh={refresh}/>
            </div>
        </div>
    </div>
  )
}

export default Submitattendance