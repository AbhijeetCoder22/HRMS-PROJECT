import React, { useEffect, useState } from 'react'
import { IoMdDownload } from "react-icons/io";

const Dowloadattendance = ({serverurl}) => {

  const [empid,setEmpId] = useState([])
  const [id,setId] = useState('')
  const [flag,setFlag] = useState(false)
  const [name,setName] = useState('')
  const [idname,setIdname] = useState([])
  const [isdisabled,setIsdisabled] = useState(false)
  const [years,setYears] = useState([])
  const [month,setMonth] = useState(0)
  const [wrkDays,setWrkdays] = useState(0)
  const [ofce,setOfce] = useState(0)
  const [hme,setHme] = useState(0)
  const [clnt,setclnt] = useState(0)
  const [year,setYear] = useState(0)
  const [msg,setMsg] = useState('')
  const [upsec,setUpsec] = useState(false)
  const [upval,setUpval] = useState('')
  const [sledt,setSledt] = useState('')
  const month_to_num = {
    'January':1,
    'February':2,
    'March':3,
    'April':4,
    'May':5,
    'June':6,
    'July':7,
    'August':8,
    'September':9,
    'October':10,
    'November':11,
    'December':12
  }

  useEffect(()=>{
    const get_empdetails = async ()=>{
      const url = serverurl
      const response = await fetch(`${url.serverurl}/getemp`)
      const result = await response.json()
      let arr = []
      let idnames = []
      for(let i = 0;i<result.length;i++){
        arr.push(result[i][3])
        idnames.push([result[i][3],result[i][1]])
      }
      setEmpId([...arr])
      setIdname([...idnames])
    }
    get_empdetails()
  },[serverurl])

  const resetflag = async (val) =>{
    const url = serverurl
    const response = await fetch(`${url.serverurl}/getattendtls`,{
      method:'POST',
      headers: {'Content-Type' : 'application/json'},
      body:JSON.stringify({id,val,month,year})
    })
    const result = await response.json()
    if (Array.isArray(result)){
      setHme(0)
      setclnt(0)
      setOfce(0)
      setWrkdays(0)
      setYears([...result[1]])
      setWrkdays(result[3][0])
      for(let j = 0;j<result[2].length;j++){
        if(result[2][j][1] === 'O'){
          setOfce(result[2][j][0])
        }
        if(result[2][j][1] === 'H'){
          setHme(result[2][j][0])
        }
        if(result[2][j][1] === 'C'){
          setclnt(result[2][j][0])
        }
      }
      
      for(let i = 0;i<idname.length;i++){
        if(idname[i][0] === id){
          setName(idname[i][1])
        }
      }
      if(id){
        setFlag(true)
        setIsdisabled(true)
      }
    }
    else{
      setMsg(result)
    }
  }

  const changeflag = () =>{
    setFlag(false)
    setIsdisabled(false)
    setUpsec(false)
  }

  const vanishmsg = () =>{
    setMsg('')
  }
  

  const downloadattendance = async () =>{
    const url = serverurl
    const response = await fetch(`${url.serverurl}/downloadempatten`,{
      method:'POST',
      headers: {'Content-Type' : 'application/json'},
      body:JSON.stringify({id,month,year})
    })
    const type = response.headers.get('Content-Type')
    if(type !== 'application/json'){
      const result = await response.blob()
      const url_d = window.URL.createObjectURL(result)
      const link = document.createElement('a');
      link.href = url_d;  
      link.setAttribute('download',`${id}_${Number(month)}_${Number(year)}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    else{
      const result = await response.json()
      setMsg(result)
    }
  }

  const updatesection = () =>{
    if(id){
      setUpsec(true)
      setFlag(false)
      setIsdisabled(true)
    }
  }

  const update = async () =>{
    const url = serverurl
    const response = await fetch(`${url.serverurl}/updateattendance`,{
      method:'POST',
      headers: {'Content-Type' : 'application/json'},
      body:JSON.stringify({id,upval,sledt})
    })
    const result = await response.json()
    if (result){
      setMsg(result)
    }
  }

  return (
    <div className='Dowloadattendance' onClick={vanishmsg}>
      <div><h2>Attentance Download Or Update</h2></div>
      <div className='errmsg'>{msg}</div>
      <div className='optionclass'>
        <span>Employee ID:</span>
        <select value={id} onChange={(e)=>(setId(e.target.value))} disabled={isdisabled}>
          <option value="">--SELECT EMPLOYEE ID--</option>
          {Array.isArray(empid)?empid.map((item,index)=>(<option key={index} value={item}>{item}</option>)):""}
        </select>
        <button onClick={()=>(resetflag(0))}>Fetch Details</button>
        <button onClick={updatesection}>Change Working From</button>
        <button onClick={changeflag}>Reset</button>
      </div>
      {
        (id && flag)?<div className='ftchdtls'>
        <div>
        <span>Employee Name:</span>
        <input type="text" placeholder='Employee Name' value={name} disabled={true}/>
        <span>Attendance Month:</span>
        <select onChange={(e)=>{setMonth(e.target.value)}}>
          <option value="">--SELECT MONTH--</option>
          <option value={month_to_num['January']}>JANUARY</option>
          <option value={month_to_num['February']}>FEBRUARY</option>
          <option value={month_to_num['March']}>MARCH</option>
          <option value={month_to_num['April']}>APRIL</option>
          <option value={month_to_num['May']}>MAY</option>
          <option value={month_to_num['June']}>JUNE</option>
          <option value={month_to_num['July']}>JULY</option>
          <option value={month_to_num['August']}>AUGUST</option>
          <option value={month_to_num['September']}>SEPTEMBER</option>
          <option value={month_to_num['October']}>OCTOBER</option>
          <option value={month_to_num['November']}>NOVEMBER</option>
          <option value={month_to_num['December']}>DECEMBER</option>
        </select>
        <span>Attendance Year:</span>
        <select onChange={(e)=>{setYear(e.target.value)}}>
          <option value="">--SELECT YEAR--</option>
          {Array.isArray(years)?years.map((item,index)=>(<option key={index} value={item}>{item}</option>)):<option value="">NOT GIVEN ATTENDANCE</option>}
        </select>
          <button onClick={()=>(resetflag(1))}>Get Attendance Count</button>
          <IoMdDownload onClick={downloadattendance}/>
        </div>
        <div>
        <div>
          <div className='total'>
            <div>
            <h3>Number Of Days Work</h3>
            <span>{wrkDays}</span>
            </div>
          </div>
          <div className='plcewsdys'>
            <div className='Office'>
            <h4>Number of Work from Office</h4>
            <span>{ofce}</span>
            </div>
            <div className='Whome'>
            <h4>Number of Work from Home</h4>
            <span>{hme}</span>
            </div>
            <div className='Client  '>
            <h4>Number of Work from Client Location</h4>
            <span>{clnt}</span>
            </div>
          </div>
        </div>
        </div>
        </div>:(id && upsec)?<div className='updtw'><span>Work Locaction:</span><select onChange={(e)=>(setUpval(e.target.value))}><option value=''>--SELECT WORKING FROM--</option><option value="O">Office</option><option value="H">Home</option><option value="C">Client Location</option></select><span>Date:</span><input type='date' value={sledt} onChange={(e)=>{setSledt(e.target.value)}}/><button onClick={update}>Update</button></div>:""
      }
    </div>
  )
}

export default Dowloadattendance