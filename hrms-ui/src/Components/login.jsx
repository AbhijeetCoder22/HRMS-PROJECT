import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import { Link } from 'react-router-dom';

const Login = ({serverurl}) => {

    const [usrnm,setUsrnm] = useState('')
    const encodedString = btoa(['false']);
    sessionStorage.setItem('token',encodedString)
    const [pswd,setPswd] = useState('')
    const navigate = useNavigate()
    const[msg,setMsg] = useState('')

    const vanishmsg = ()=>{
        setMsg('')
    }

    const loginhandle = async(url) => {
        const fnl_url = `${url}login`
        const usr_cred = {usrnm,pswd}
        const response = await fetch(fnl_url,{
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body:JSON.stringify(usr_cred)})
        const result = await response.json()
        if (result[0] === 'true'){
            const encodedresult = btoa(result);
            sessionStorage.setItem('token',encodedresult)
            if(atob(sessionStorage.getItem('token')).split(',')[2] === '-1'){
                navigate('/Home')
            }
            else{
                navigate('/Home/Attendance')
            }
        }
        else{
            setMsg(result)
            sessionStorage.setItem('token',encodedString)
            navigate('/')
        }
    }

  return (
    <div className='login' onClick={vanishmsg}>
        <h1>USER LOGIN</h1>
        <h4>WELCOME TO HRMS</h4>
        <div className="input">
            <div className='inputtbl'>
                <div className='errmsg'>{msg}</div>
                <div className="usrname"><IoPersonSharp /><input type = "text" placeholder='Username' value={usrnm} onChange={(e)=>{setUsrnm(e.target.value)}}/></div>
                <div className="pswd"><IoIosLock /><input type="password" placeholder='Password' value={pswd} onChange={(e)=>{setPswd(e.target.value)}}/></div>
                <div>
                    <span><Link to={"/Resetpassword"}>Forget Your Password?</Link></span>
                </div>
            </div>
        </div>
        <div className="submitbtn"><button onClick={()=>{loginhandle(serverurl)}}>LOGIN</button></div>
    </div>
  )
}

export default Login