import React from 'react'

const Employeeprim = ({fname,setFname,usrname,setUsrname,mailid,setMailid,empids,setEmpids,phnno,setPhnno,postion,setPosition}) => {

  return (
    <div className='Employeeprim'>
        <table>
            <tbody>
                <tr>
                    <td><label htmlFor="Flnme">Full Name:</label></td>
                    <td><input type='text' placeholder='Enter Full Name' value={fname} onChange={(e)=>{setFname(e.target.value)}}/></td>
                    <td><label htmlFor="usr">Username:</label></td>
                    <td><input type='text' placeholder='Enter Username' name="usr" value={usrname} onChange={(e)=>{setUsrname(e.target.value)}}/></td>
                    <td><label htmlFor='mail'>Mail ID:</label></td>
                    <td><input type='mail' placeholder='Enter MailId' name='mail' value={mailid} onChange={(e)=>{setMailid(e.target.value)}}/></td>
                </tr>
                <tr>
                    <td><label htmlFor="mno">Mobile Number:</label></td>
                    <td><input type='tel' placeholder='Enter Mobile Number' name="mno" value={phnno} onChange={(e)=>{setPhnno(e.target.value)}}/></td>
                    <td><label htmlFor='eid'>Employee ID:</label></td>
                    <td><input type='text' placeholder='Enter Employee Id' name='eid' value={empids} onChange={(e)=>{setEmpids(e.target.value)}}/></td>
                    <td><label htmlFor='pos'>Position:</label></td>
                    <td><input type='text' placeholder='Enter Employee Id' name='pos' value={postion} onChange={(e)=>{setPosition(e.target.value)}}/></td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Employeeprim