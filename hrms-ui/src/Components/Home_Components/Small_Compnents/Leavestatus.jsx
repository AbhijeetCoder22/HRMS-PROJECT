import React, { useState } from 'react'

const Leavestatus = ({serverurl}) => {
  
  const [status,setStatus] = useState('')
  const [leaves,setLeaves] = useState([])
  const [isClicked,setIsClicked] = useState(false)
  const [msg,setMsg] = useState('')

  const get_leaves = async ()=>{
    const personid = atob(sessionStorage.getItem('token')).split(",")[3]
    const response = await fetch(`${serverurl}/leavestatus`,{
      method:'POST',
      headers: {'Content-Type' : 'application/json'},
      body:JSON.stringify({personid,status})
    })
    const result = await response.json()
    if (result){
      if (status){
        setIsClicked(true)
        setLeaves(result)
      }
      else{
        setIsClicked(false)
        setMsg(result)
      }
    }
  }

  const vanishmsg = ()=>{
    setMsg('')
  }


  return (
    <div className='Leavestatus' onClick={vanishmsg}>
      <h2>Leave Status</h2>
      <div>{msg}</div>
      <div>
        <div>
        <span>Select Status:</span>
        <select onChange={(e)=>(setStatus(e.target.value))}>
          <option value="">--SELECT STATUS--</option>
          <option value="APPROVED">APPROVED</option>
          <option value="PENDING">PENDING</option>
          <option value="REJECTED">REJECTED</option>
        </select>
        <button onClick={get_leaves}>Fetch Leaves</button>
        </div>
      </div>
      {(isClicked)?<div>
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
            </tr>
          </thead>
          <tbody>
          {(Array.isArray(leaves))?leaves.map((item,index)=>(
            <tr key={index}><td>{item[1]}</td><td>{item[0]}</td><td>{item[2]}</td><td>{item[4]}</td><td>{item[6]}</td><td>{item[7]}</td><td>{item[5]}</td></tr>
          )):""}
          {(leaves.length === 0)?<tr><td></td><td></td><td></td><td>NO RECORDS !!!</td><td></td><td></td><td></td></tr>:""}
          </tbody>
        </table>
      </div>:''}
      
    </div>
  )
}

export default Leavestatus