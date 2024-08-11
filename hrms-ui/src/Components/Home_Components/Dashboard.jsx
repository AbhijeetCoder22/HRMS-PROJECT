import React,{ useEffect, useState } from 'react'
import Dashboardchart from './Small_Compnents/Dashboardchart'

const Dashboard = ({serverurl}) => {

  const [total_Employee,setTotal_Employee] = useState(0)
  const [emp_Online,setEmp_Online] = useState(0)
  const [emp_on_leave,setEmp_on_leave] = useState(0)
  const [work_from_office,setWork_from_office] = useState(0)
  const [work_from_home,setWork_from_home] = useState(0)
  const [work_from_client,setWork_from_Client] = useState(0)
  const [emp_details,setEmp_details] = useState([])

  useEffect(()=>{
    const get_date = async () =>{
      const response =  await fetch(`${serverurl}/dashboarddata`)
      if (response.ok){
        const result = await response.json()
        setTotal_Employee(result.Total_Employee)
        setEmp_Online(result.Employee_Online)
        setEmp_on_leave(result.Total_Employee-result.Employee_Online)
        setWork_from_office(result.get_work_from_office)
        setWork_from_home(result.get_work_from_home)
        setWork_from_Client(result.get_work_from_client_location)
      }
    }
    get_date()
  },[serverurl])

  const data = {
    labels: ['Employee Online', 'Employee On Leave'],
    datasets: [
        {
            label: '# of Employees',
            data: [emp_Online, emp_on_leave],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
        },
    ],
  }

  const get_emp_details = async(type) =>{
    const response = await fetch(`${serverurl}/dashboarddata`,{
      method:'POST',
      headers: {'Content-Type' : 'application/json'},
      body:JSON.stringify({type})})
    
    if(response.ok){
      const result = await response.json()
      setEmp_details(result.employee_details)
    }
  }


  return (
    <div className='Dashboard'>
      <div>
        <div>
          <div>
            <Dashboardchart data={data}/>
          </div>
          <div>
            <div>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td>TOTAL EMPLOYEE:</td>
                      <td>{total_Employee}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>Employee Online</td>
                    <td>{emp_Online}</td>
                  </tr>
                  <tr>
                    <td>Employee On Leave</td>
                    <td>{emp_on_leave}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <span>
            <span onClick={()=>{get_emp_details('O')}}>
              <h2>Work From Office</h2>
              <span>{work_from_office}</span>
            </span>
            <span onClick={()=>{get_emp_details('H')}}>
              <h2>Work From Home</h2>
              <span>{work_from_home}</span>
            </span>        
            <span onClick={()=>{get_emp_details('C')}}>
              <h2>Work From Client Location</h2>
              <span>{work_from_client}</span>
            </span>
            <span onClick={()=>{get_emp_details('L')}}>
              <h2>Employee On Leave</h2>
              <span>{emp_on_leave}</span>
            </span>
          </span>
        </div>
      </div>
      <div>
        <h1>Employee Details</h1>
          <span>
          <table>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                </tr>
              </thead>
            </table>
            <span>
            <table>
              <tbody>
                {Array.isArray(emp_details)?emp_details.map((item,index)=>(<tr key={index}><td>{item[0]}</td><td>{item[1]}</td></tr>)):"NO RECORDS FOUND"}
              </tbody>
            </table>
            </span>
          </span>
      </div>
    </div>
  )
}

export default Dashboard