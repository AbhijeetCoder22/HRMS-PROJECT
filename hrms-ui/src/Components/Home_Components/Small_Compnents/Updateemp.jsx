import React,{ useState,useEffect } from 'react'
import { FaEdit } from "react-icons/fa";

const Updateemp = ({serverurl,refresh,setEditEmpDtls,setUpdateEmp,setEmpid}) => {
    const [data,setData] = useState('')

    useEffect(()=>{
        const getemps = async ()=>{
            const response = await fetch(`${serverurl}/getemp`)
            const result = await response.json()
            setData(result)
        }
        getemps()
      },[refresh,serverurl])


    const openedit = (id)=>{
        setEmpid(id)
        setEditEmpDtls(true)
        setUpdateEmp(false)
    }

  return (
    <div className='UpdateEmps'>
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(Array.isArray(data))?
                        data.map((item,index)=>(<tr key={index}><td>{item[1]}</td><td>{item[2]}</td><td>{item[3]}</td><td>{item[4]}</td><td>{item[5]}</td><td>{item[6]}</td>
                        <td><FaEdit values={item[0]} onClick={()=>{openedit(item[0])}}/></td>
                        </tr>)):
                        "No Employees!!"}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Updateemp