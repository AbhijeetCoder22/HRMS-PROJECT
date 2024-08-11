import React, { useState } from 'react'

const Register = ({serverurl,setrefresh,refresh}) => {

    const [fullname,setFullname] = useState('')
    const [jningdt,setJningdt] = useState('')
    const [mailid,setMailid] = useState('')
    const [mobilenumber,setMobilenumber] = useState('')
    const [usrnme,setUsrnm] = useState('')
    const [pswd,setPswd] = useState('')
    const [cnfpswd,setCnfpswd] = useState('')
    const [employeeid,setEmployeeid] = useState('')
    const [msg,setMsg] = useState('')
    const [data,setData] = useState([])
    const [position,setPosition] = useState('')
    const [role,setRole] = useState('')


    const register = async () => {
            setData([])
            data.push({fullname,jningdt,mailid,mobilenumber,employeeid,usrnme,pswd,position,cnfpswd,role})
            
            const register_url = `${serverurl}/register`
            const response = await fetch(register_url,{
                method:'POST',
                headers: {'Content-Type' : 'application/json'},
                body:JSON.stringify(data)
            })
            const result = await response.json()
            setMsg(result)
            if (result === "EMPLOYEE ADDED !!!"){
                setrefresh(refresh+1)
            }
    }

    
    const vanishmsg = ()=>{
        setMsg('')
    }


  return (
    <div className='Register' onClick={vanishmsg}>
        <div>
        <div><h1>ADD EMPLOYEE FORM</h1></div>
        <div className='msg'>{msg}</div>
        <div>
            <table>
                <tbody>
                    <tr>
                        <td><label htmlFor='flnme'>Enter Full Name:</label></td>
                        <td><input type='text' placeholder='Enter Full name:' value={fullname} onChange={(e)=>{setFullname(e.target.value)}} name='flnme'/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='mailID'>Enter Mail ID:</label></td>
                        <td><input type='mail' placeholder='Enter mailid' value={mailid} onChange={(e)=>{setMailid(e.target.value)}} name='mailID'/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='mobNum'>Enter Mobile Number:</label></td>
                        <td><input type='tel' placeholder='Enter Mobile Number' value={mobilenumber} onChange={(e)=>{setMobilenumber(e.target.value)}} name='mobNum'/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='empID'>Enter Employee ID:</label></td>
                        <td><input type='text' placeholder='Enter Employee ID' value={employeeid} onChange={(e)=>{setEmployeeid(e.target.value)}} name='empID'/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='jngDT'>Enter Joining Date:</label></td>
                        <td><input type='date' value={jningdt} onChange={(e)=>{setJningdt(e.target.value)}} name='jngDT'/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='positiom'>Enter Position:</label></td>
                        <td><input type='text' placeholder='Enter Position' value={position} onChange={(e)=>{setPosition(e.target.value)}} name='positiom'/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='usrnme'>Enter Username:</label></td>
                        <td><input type='text' placeholder='Enter username' value={usrnme} onChange={(e)=>{setUsrnm(e.target.value)}} name='usrnme'/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='pswd'>Enter Password:</label></td>
                        <td><input type="text" placeholder='Password' value={pswd} onChange={(e)=>{setPswd(e.target.value)}} name='pswd'/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor='Repswd'>Re-Enter Password:</label></td>
                        <td><input type='password' placeholder='confirm password' value={cnfpswd} onChange={(e)=>{setCnfpswd(e.target.value)}} name='Repswd'/></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="Roles">Select role for Employee:</label></td>
                        <td><select name="Roles" id="Roles" value={role} onChange={(e)=>{setRole(e.target.value)}}>
                                <option>--SELECT--</option>
                                <option value="-1">ADMIN</option>
                                <option value="1">HR</option>
                                <option value="2">EMPLOYEE</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={register}>Create Employee</button>
        </div>
        </div>
    </div>
  )
}

export default Register