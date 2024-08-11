import React, { useEffect, useState } from 'react'
import { GoDotFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";


const Holiday = ({serverurl}) => {

  const [select,setSelect] = useState('')
  const [selectdelete,setSelectDelete] = useState('')
  const [startDates, setStartDate] = useState('')
  const [holidayname,setHoliday] = useState('')
  const [type,setType] = useState('')
  const [msg,setMsg] = useState('')
  const [showholiday,setShowHoliday] = useState([])
  const [refresh,setRefresh] = useState(0)
  const [deletemsg,setDeletemsg] = useState('')
  const [isAdd,setIsAdd] = useState("NO")
  const [isShow,setIsShow] = useState("NO")
  const [isDelete,setIsDelete] = useState("NO")
  


  const add = ()=>{
    setSelect('Add')
    setSelectDelete('')
  }

  useEffect(()=>{
    const getholiday = async ()=>{
        const response = await fetch(`${serverurl}/showholiday`)
        const result = await response.json()
        setShowHoliday(result)
    }
    getholiday()
  },[refresh,serverurl])

  useEffect(()=>{
    const get_features = async () =>{
      const response = await fetch(`${serverurl}/getfeatures`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({"roleid":atob(sessionStorage.getItem('token')).split(",")[2]})
      })
      const result = await response.json()
      setIsAdd(result[0][14])
      setIsShow(result[0][15])
      setIsDelete(result[0][16])
    }
    get_features()
  },[serverurl,atob(sessionStorage.getItem('token'))])

  const show = ()=>{
    setSelect('show')
    setSelectDelete('')
  }

  const deletehol = ()=>{
    setSelectDelete('Delete')
  }

  const vanishmsg = () => {
    setMsg('')
    setDeletemsg('')
  }

  const addholiday = async ()=>{
    const data = {holidayname,startDates,type}
    const response = await fetch(`${serverurl}/addholiday`,{
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body:JSON.stringify(data)})
    const result = await response.json()
    setMsg(result)
    setStartDate('')
    setHoliday('')
    setType('')
    setRefresh(refresh+1)
  }

  const handlevalue = async (id) => {
    const response = await fetch(`${serverurl}/deleteholiday`,{
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body:JSON.stringify({id})
    })
    const result = await response.json()
    if (result === 'DELETED !!!'){
        setMsg(result)
        setRefresh(refresh+1)
    }
    else{
        setMsg(result)
    }
  }

 

  return (
    <div className='Holidaylist'>
        <div className="bdylft">
            {(isAdd==="YES")?<button onClick={add}><GoDotFill />Add Holiday</button>:""}
            {(isShow==="YES")?<button onClick={show}><GoDotFill />Show Holiday</button>:""}
            {(isDelete==="YES")?<button onClick={deletehol}><GoDotFill />Delete Holiday</button>:""}
        </div>
        <div className="bdyrgt">
            {(!selectdelete)?((select==='Add')?<div className='add' onClick={vanishmsg}>
                <h2>Add Holiday</h2>
                <div>
                <div className='errormsg'>{msg}</div>
                    <table>
                        <tbody>
                        <tr>
                            <td><label htmlFor='holidayname'>Name Of Holiday:</label></td>
                            <td><input type='text' placeholder='Name Of Holiday' name='holidayname' value={holidayname} onChange={(e)=>(setHoliday(e.target.value))}/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor='holidayname'>Date Of Holiday:</label></td>
                            <td><input type="date" value={startDates} onChange={(e)=>{setStartDate(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor='type'>Type Of Holiday:</label></td>
                            <td><select name='type' value={type} onChange={(e)=>{setType(e.target.value)}}><option value=''>--SELECT--</option><option value='NORMAL'>Normal Holiday</option><option value='FlEXI'>Flexi Holiday</option></select></td>
                        </tr>
                        </tbody>
                    </table>
                    <div><button onClick={addholiday}>Add Holiday</button></div>
                </div>
            </div>:
            <div className='showholiday' onClick={vanishmsg}>
                <h2>Holiday List</h2>
                <div>{deletemsg}</div>
                <div>
                <table>
                  <thead>
                    <tr>
                      <th>Date Of Holiday</th>
                      <th>Name Of Holiday</th>
                      <th>Type Of Holiday</th>
                    </tr>
                  </thead>
                  <tbody>
                  {(Array.isArray(showholiday))?showholiday.map((item,index)=>(<tr key={index}>
                    <td>{`${new Date(item[1]).getDate()}-${new Date(item[1]).getMonth() + 1}-${new Date(item[1]).getFullYear()}`}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                    </tr>)):
                    "NO HOLIDAYS ARE PRESENT !!!"}
                  </tbody>
                </table>
                </div>
                </div>):
            <div className='showholiday' onClick={vanishmsg}>
                <div><h2>Holiday List</h2>
                <div>{deletemsg}</div>
                </div>
                <div>
                <table>
                  <thead>
                    <tr>
                      <th>Date Of Holiday</th>
                      <th>Name Of Holiday</th>
                      <th>Type Of Holiday</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {(Array.isArray(showholiday))?showholiday.map((item,index)=>(<tr key={index}>
                    <td>{`${new Date(item[1]).getDate()}-${new Date(item[1]).getMonth() + 1}-${new Date(item[1]).getFullYear()}`}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                    <td><button value={item[0]} onClick={()=>{handlevalue(item[0])}}><MdDelete /></button></td>
                    </tr>)):
                    <tr><td></td>"NO HOLIDAYS ARE PRESENT !!!"<td></td></tr>}
                  </tbody>
                </table>
                </div>
            </div>}
        </div>
    </div>
  )
}

export default Holiday