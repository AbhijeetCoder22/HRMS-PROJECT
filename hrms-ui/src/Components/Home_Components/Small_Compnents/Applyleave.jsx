import React, { useState } from 'react'

const Applyleave = ({serverurl}) => {

  const [leavename,setLeavename] = useState('')
  const [reason,setReason] = useState('')
  const [strtdt,setStrtdt] = useState('')
  const [enddt,setEnddt] = useState('')
  const [type,setType]  = useState('')
  const [msg,setMsg] = useState('')

  const submitleave = async ()=>{
    const url = serverurl
    const id = atob(sessionStorage.getItem('token')).split(",")[3]
    const response = await fetch(`${url}/leavemanagement`,{
      method:'POST',
      headers: {'Content-Type' : 'application/json'},
      body:JSON.stringify({leavename,reason,strtdt,enddt,type,id})
    })
    const result = await response.json()
    setMsg(result)
  }

  const vanishmsg = () =>{
    setMsg('')
  }

  return (
    <div className='Applyleave' onClick={vanishmsg}>
      <h2>Apply Leave</h2>
      <div className='msg'>{msg}</div>
      <div>
        <span>Leave Name:</span>
        <input type='text' placeholder='Leave Name' value={leavename} onChange={(e)=>{setLeavename(e.target.value)}}/>
        <span>Reason Of Leave:</span>
        <textarea placeholder='Reason Of Leave' value={reason} onChange={(e)=>{setReason(e.target.value)}}></textarea>
        <span>Leave From/On:</span>
        <input type='date' value={strtdt} onChange={(e)=>{setStrtdt(e.target.value)}}/>
      </div>
      <div>
        <span>Joining Date:</span>
        <input type='date' value={enddt} onChange={(e)=>{setEnddt(e.target.value)}}/>
        <span>Select Type:</span>
        <select onChange={(e)=>{setType(e.target.value)}}>
          <option value="">--SELECT TYPE OF LEAVE--</option>
          <option value="CASUAL LEAVE">CASUAL LEAVE</option>
          <option value="SICK LEAVE">SICK LEAVE</option>
          <option value="PERSONAL LEAVE">PERSONAL LEAVE</option>
        </select>
        <button onClick={submitleave}>Submit</button>
      </div>
    </div>
  )
}

export default Applyleave