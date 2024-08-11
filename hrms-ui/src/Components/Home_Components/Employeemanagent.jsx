import React, { useState , useEffect} from 'react'
import { GoDotFill } from "react-icons/go";
import Register from '../Register';
import Showemps from './Small_Compnents/Showemps';
import Updateemp from './Small_Compnents/Updateemp';
import Editemp from './Small_Compnents/Editemp'

const Employeemanagent = ({serverurl}) => {

    const [add,setAddEmp] = useState(false)
    const [update,setUpdateEmp] = useState(false)
    const [show,setShowEmp] = useState(false)
    const [refresh,setrefresh] = useState(0)
    const [openedit,setOpenedit] = useState(false)
    const [empid,setEmpid] = useState(0)
    const [isAddEmp,setIsAddEmp] = useState("NO")
    const [isUpdateEmp,setIsUpdateEmp] = useState("NO")
    const [isShowEmp,setIsShowEmp] = useState("NO")
    const [isEditEmp,setIsEditEmp] = useState("NO")

    const addempdhow = () => {
        setAddEmp(true)
        setUpdateEmp(false)
        setShowEmp(false)
        setOpenedit(false)
    }

    const updateemp = () => {
        setAddEmp(false)
        setUpdateEmp(true)
        setShowEmp(false)
        setOpenedit(false)
    }   

    const shoeemp = () => {
        setAddEmp(false)
        setUpdateEmp(false)
        setShowEmp(true)
        setOpenedit(false)
    }

    const openeditemp = () =>{
        setAddEmp(false)
        setUpdateEmp(false)
        setShowEmp(false)
        setOpenedit(true)
        setEmpid(atob(sessionStorage.getItem('token')).split(",")[3])
    }

    useEffect(()=>{
        const get_features = async () =>{
          const response = await fetch(`${serverurl}/getfeatures`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({"roleid":atob(sessionStorage.getItem('token')).split(",")[2]})
          })
          const result = await response.json()
          setIsAddEmp(result[0][5])
          setIsUpdateEmp(result[0][6])
          setIsShowEmp(result[0][7])
          setIsEditEmp(result[0][8])
        }
        get_features()
      },[serverurl,atob(sessionStorage.getItem('token'))])

  return (
    <div className='Employeemanagement'>
        <div className="bdylft">
            {(isAddEmp==="YES")?<button onClick={addempdhow}><GoDotFill />Add Employee</button>:""}
            {(isUpdateEmp==="YES")?<button onClick={updateemp}><GoDotFill />Update Employee Details</button>:""}
            {(isShowEmp==="YES")?<button onClick={shoeemp}><GoDotFill />Show Employee</button>:""}
            {(isEditEmp==="YES")?<button onClick={openeditemp}><GoDotFill/>Edit Details</button>:""}
        </div>
        <div className="bdyrgt">
        {(add)?<Register serverurl={serverurl} setrefresh={setrefresh} refresh={refresh}/>:""}
        {(update)?<Updateemp serverurl={serverurl} setrefresh={setrefresh} refresh={refresh} setEditEmpDtls={setOpenedit} setUpdateEmp={setUpdateEmp} setEmpid={setEmpid}/>:""}
        {(show)?<Showemps serverurl={serverurl} refresh={refresh}/>:""}
        {(openedit)?<Editemp empid={empid} updateemp={updateemp} serverurl={serverurl} setrefresh={setrefresh} refresh={refresh}/>:""}
        </div>
    </div>
  )
}

export default Employeemanagent