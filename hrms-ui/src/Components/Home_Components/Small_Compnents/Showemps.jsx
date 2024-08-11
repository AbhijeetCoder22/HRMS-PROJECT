import React, { useState,useEffect } from 'react'

const Showemps = ({serverurl,refresh}) => {
    const [data,setData] = useState('')

    useEffect(()=>{
        const getemps = async ()=>{
            const response = await fetch(`${serverurl}/getemp`)
            const result = await response.json()
            setData(result)
        }
        getemps()
      },[refresh,serverurl])

  return (
    <div className='Showemps'>
        <div>
            <div><h2>List Of Employees</h2></div>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Maild Id</th>
                        <th>Employee ID</th>
                        <th>Position</th>
                        <th>Joining Date</th>
                        <th>Exiting Employee</th>
                    </tr>
                </thead>
                <tbody>
                    {(Array.isArray(data))?data.map((item,index)=>(<tr key={index}><td>{item[1]}</td><td>{item[2]}</td><td>{item[3]}</td><td>{item[4]}</td><td>{item[5]}</td><td>{item[6]}</td></tr>)):"No Employees!!"}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Showemps