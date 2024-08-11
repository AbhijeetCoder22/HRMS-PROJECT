import React, { useEffect, useState } from 'react'

const Leaverequest = ({serverurl}) => {

  const [leaverqts,setLeavergts] = useState([])
  const [msg,setMsg] = useState('')
  const [refresh,setRefresh] = useState(0)

  const approve_leave = async (val) =>{
    const status = 'APPROVED'
    const response = await fetch(`${serverurl}/leaverequestaction`,{
      method:'POST',
      headers: {'Content-Type' : 'application/json'},
      body:JSON.stringify({val,status})
    })
    const result = await response.json()
    if (result){
      setMsg(result)
      setRefresh(refresh + 1)
    }
  }

  const reject_leave = async (val) =>{
    const status = 'REJECTED'
    const response = await fetch(`${serverurl}/leaverequestaction`,{
      method:'POST',
      headers: {'Content-Type' : 'application/json'},
      body:JSON.stringify({val,status})
    })
    const result = await response.json()
    if (result){
      setMsg(result)
      setRefresh(refresh + 1)
    }
  }

  useEffect(()=>{
    const get_pending_leave = async () =>{
      const personid = atob(sessionStorage.getItem('token')).split(",")[3]
      const response = await fetch(`${serverurl}/leaverequest`,{
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body:JSON.stringify({personid})
      })
      const result = await response.json()
      setLeavergts(result)
    }
    get_pending_leave()
  },[serverurl,refresh])


  return (
    <div className='Leaverequest'>
      <h2>Leave Request</h2>
      <div className='msg'>{msg}</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Leave Name</th>
              <th>Leave Reason</th>
              <th>Leave From</th>
             <th>Joining Date</th>
              <th>Type Of Leave</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(leaverqts))?leaverqts.map((item,index)=>(
              <tr key={index}><td>{item[1]}</td><td>{item[0]}</td><td>{item[2]}</td><td>{item[4]}</td><td>{item[6]}</td><td>{item[7]}</td><td>{item[5]}</td><td><div><div><button onClick={()=>{approve_leave(item[8])}}>Approve</button></div><div><button onClick={()=>{reject_leave(item[8])}}>Reject</button></div></div></td></tr>
            )):"NO REQUEST PENDIND !!!"}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaverequest