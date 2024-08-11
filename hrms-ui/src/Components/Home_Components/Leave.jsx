import React, { useState , useEffect } from 'react'
import { GoDotFill } from "react-icons/go"; 
import Leaverequest from './Small_Compnents/Leaverequest';
import Leavestatus from './Small_Compnents/Leavestatus';
import Applyleave from './Small_Compnents/Applyleave';

const Leave = ({serverurl}) => {

  const [lverq,setLverq] = useState(false)
  const [aplve,setAplve] = useState(false)
  const [lvests,setLvests] = useState(false)
  const [isLeaveSts,setIsLeaveSts] = useState("NO")
  const [isApplylve,setIsApplylve] = useState("NO")
  const [isLveRq,setIsLveRq] = useState("NO")

  const openleavestatus = ()=>{
    setAplve(false)
    setLverq(false)
    setLvests(true)
  }

  const openleaverequest = ()=>{
    setAplve(false)
    setLverq(true)
    setLvests(false)
  }

  const openapplyleave = ()=>{
    setAplve(true)
    setLverq(false)
    setLvests(false)
  }

  useEffect(()=>{
    const get_features = async () =>{
      const response = await fetch(`${serverurl}/getfeatures`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({"roleid":atob(sessionStorage.getItem('token')).split(",")[2]})
      })
      const result = await response.json()
      setIsLeaveSts(result[0][9])
      setIsApplylve(result[0][10])
      setIsLveRq(result[0][11])
    }
    get_features()
  },[serverurl,atob(sessionStorage.getItem('token'))])

  return (
    <div className='Leave'>
      <div className='bdylft'>
        {(isLeaveSts==="YES")?<button onClick={openleavestatus}><GoDotFill />Leave Status</button>:""}
        {(isApplylve==="YES")?<button onClick={openapplyleave}><GoDotFill />Apply Leave</button>:""}
        {(isLveRq==="YES")?<button onClick={openleaverequest}><GoDotFill />Leave Request</button>:""}
      </div>
      <div className='bdyrgt'>
        {(lverq?<Leaverequest serverurl={serverurl}/>:"")}
        {(lvests)?<Leavestatus serverurl={serverurl}/>:""}
        {(aplve)?<Applyleave serverurl={serverurl}/>:""}
      </div>
    </div>
  )
}

export default Leave