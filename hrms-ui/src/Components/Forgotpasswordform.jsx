import React, { useState } from 'react'
import { FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Forgotpasswordform = ({serverurl}) => {
    
    const [isSecond,setIsecond] = useState('false')
    const [usrnme,setUsrnme] = useState('')
    const [msg,setMsg] = useState('')
    const [isDisbles,setIsDisabled] = useState(false)
    const [empId,setEmpId] = useState('')
    const [nwpswd,setNwpswd] = useState('')
    const [cnfpswd,setCnfpswd] = useState('')

    const vanishmsg = ()=>{
        setMsg('')
    }
    
    const isuserexist = async ()=>{
            const url = `${serverurl}userexist`
            const data = {usrnme}
            const response = await fetch(url,{
                method:'POST',
                headers: {'Content-Type' : 'application/json'},
                body:JSON.stringify(data)
                }
            )
            const result = await response.json()
            if (result==='true'){
                setIsecond('true')
                setIsDisabled(true)
            }
            else{
                setMsg(result)
            }
    }

    const updatepswd = async ()=>{
        const url = `${serverurl}updatepswd`
        const data = {usrnme,nwpswd,cnfpswd,empId}
        const response = await fetch(url,{
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body:JSON.stringify(data)
            }
        )
        const result = await response.json()
        if (result[0]==='true'){
            setMsg(result[1])
        }
        else{
            setMsg(result)
        }
}



  return (
    <div className='Forgotpasswordform' onClick={vanishmsg}>
        <div>
            <div>
                <div><FaLock className='lock'/></div>
                <div><h1>Reset Password</h1></div>
            </div>
            <div className="Firstinputs">
                <div><div>{msg}</div></div>
                <div><input type='text' placeholder='Enter Username' value={usrnme} onChange={(e)=>(setUsrnme(e.target.value))} disabled={isDisbles}/></div>
                <div><div><button onClick={isuserexist} disabled={isDisbles}>Next</button></div></div>
            </div>
            {(isSecond==='true')?
            <div className='Secondinputs'>
                <div><input type='text' placeholder='Enter Employee ID' value={empId} onChange={(e)=>(setEmpId(e.target.value))}/></div>
                <div><input type='text' placeholder='Enter New Password' value={nwpswd} onChange={(e)=>(setNwpswd(e.target.value))}/></div>
                <div><input type='password' placeholder='Confirmed Password' value={cnfpswd} onChange={(e)=>(setCnfpswd(e.target.value))}/></div>
                <div><div><button onClick={updatepswd}>Update</button></div></div>
            </div>
            :''}
            <div><div><div><Link to="/"><button>Cancel</button></Link></div></div></div>
        </div>
    </div>
  )
}

export default Forgotpasswordform