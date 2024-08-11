import React, { useState , useEffect } from 'react'
import { GoDotFill } from "react-icons/go";
import Submitattendance from './Small_Compnents/Submitattendance';
import Dowloadattendance from './Small_Compnents/Dowloadattendance';

const Attendance = (serverurl) => {
  
  const [submitattendance,setSubmitattendance] = useState(false)
  const [downloadattendance,setDownloadattendance] = useState(false)
  const [isSubmitAttendance,setIsSubmitAttendance] = useState("NO")
  const [isMiscellaneous,setIsMiscellaneous] = useState("NO")

  useEffect(()=>{
    const get_features = async () =>{
      const response = await fetch(`${serverurl.serverurl}/getfeatures`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({"roleid":atob(sessionStorage.getItem('token')).split(",")[2]})
      })
      const result = await response.json()
      setIsSubmitAttendance(result[0][12])
      setIsMiscellaneous(result[0][13])
    }
    get_features()
  },[serverurl,atob(sessionStorage.getItem('token'))])


  const openattendacepage = ()=>{
    setDownloadattendance(false)
    setSubmitattendance(true)
  }

  const opendownattendacepage = ()=>{
    setSubmitattendance(false)
    setDownloadattendance(true)
  }


  return (
    <div className='Attendance'>
      <div className="bdylft">
        {(isSubmitAttendance==="YES")?<button onClick={openattendacepage}><GoDotFill />Submit Attendance</button>:""}
        {(isMiscellaneous==="YES")?<button onClick={opendownattendacepage}><GoDotFill />Miscellaneous</button>:""}
      </div>
      <div className="bdyrgt">
        {(submitattendance)?<Submitattendance serverurl={serverurl}/>:''}
        {(downloadattendance)?<Dowloadattendance serverurl={serverurl}/>:''}
      </div>
    </div>
  )
}

export default Attendance