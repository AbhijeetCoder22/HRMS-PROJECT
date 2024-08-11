import React, { useEffect, useState } from 'react'
import Employeeprim from './Employeeprim'
import Employeesec from './Employeesec'
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

const Editemp = ({empid,updateemp,serverurl,setrefresh,refresh}) => {

    const [fname,setFname] = useState('')
    const [usrname,setUsrname] = useState('')
    const [mailid,setMailid] = useState('')
    const [phnno,setPhnno] = useState('')
    const [empids,setEmpids] = useState('')
    const [postion,setPosition] = useState('')
    const [empexist,setEmpexist] = useState('')

    const [aadhar,setAadharnum] = useState('')
    const [pncrd,setPncrd] = useState('')
    const [addrs,setAddrs] = useState('')
    const [fthrnme,setFthrnme] = useState('')
    const [mthrnme,setMthrnme] = useState('')
    const [spnme,setSpnme] = useState('')
    const [tnthmrk,settnthmrk] = useState('')
    const [tnthscl,setTnthscl] = useState('')
    const [twthmrk,setTwthmrk] = useState('')
    const [twthclg,setTwthclg] = useState('')
    const [gradmrk,setGradmrk] = useState('')
    const [gradclg,setGradcld] = useState('')

    const [fstprt,setFstprt] = useState([])
    const [scdprt,setScdprt] = useState([])
    const [fnldata,setFnldata] = useState([])

    const[msg,setMsg] = useState('')

    const svehandler = async () => {
        setFstprt([])
        fstprt.push({fname,usrname,mailid,phnno,empids,postion})
        setScdprt([])
        scdprt.push({aadhar,pncrd,addrs,fthrnme,mthrnme,spnme,tnthmrk,tnthscl,twthmrk,twthclg,gradmrk,gradclg})
        setFnldata([])
        fnldata.push({empid,fstprt,scdprt})
        const response = await fetch(`${serverurl}/updateempsdtls`,{
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body:JSON.stringify(fnldata)
        })
        const result = await response.json()
        setMsg(result)
    }

    const lockusr = async ()=>{
        const tempid = atob(sessionStorage.getItem('token')).split(",")[3]
        const response = await fetch(`${serverurl}/lockunlockuser`,{
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body:JSON.stringify({empid,empexist,tempid})
        })
        const result = await response.json()
        if (result === 'true'){
            setrefresh(refresh+1)
            if (empexist==='YES'){
                setEmpexist('NO')
            }
            else{
                setEmpexist('YES')
            }
        }
        else{
            setMsg(result)
        }
    }

    const downloadinfo = async ()=>{
        const response = await fetch(`${serverurl}/downloadinfo`,{
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body:JSON.stringify({empid})
        })
        const result = await response.blob();
        const url = window.URL.createObjectURL(result);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fname.split(" ")[0]}_Candidate_Info.docx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    useEffect(()=>{
        const getemps = async ()=>{
            const response = await fetch(`${serverurl}/getemp`)
            const result = await response.json()
            for(let i = 0;i < result.length;i++){
                if (Number(empid)===Number(result[i][0])){
                    setFname(result[i][1])
                    setEmpids(result[i][3])
                    setMailid(result[i][2])
                    setPosition(result[i][4])
                    setPhnno(result[i][8])
                    setUsrname(result[i][7])
                    setEmpexist(result[i][6])
                }
            }
        }
        getemps()

        const getempsdtls = async ()=>{
            const response = await fetch(`${serverurl}/getempdtls`)
            const result = await response.json()
            if (result !== 'false')
            for(let i = 0;i < result.length;i++){
                if (Number(empid)===Number(result[i][0])){
                    setAadharnum(result[i][1])
                    setPncrd(result[i][2])
                    setAddrs(result[i][3])
                    setFthrnme(result[i][4])
                    setMthrnme(result[i][5])
                    setSpnme(result[i][6])
                    settnthmrk(result[i][7])
                    setTnthscl(result[i][8])
                    setTwthmrk(result[i][9])
                    setTwthclg(result[i][10])
                    setGradmrk(result[i][11])
                    setGradcld(result[i][12])
                }
            }
        }
        getempsdtls()
    }    
    ,[empid,serverurl])

    const vanishmsg = () =>{
        setMsg('')
    }
    
  return (
    <div className='Editemp' onClick={vanishmsg}>
        <div>
        <div><h2>Edit Employee Details</h2></div>
            <div className='actions'>
                <div>
                {
                (empid!==atob(sessionStorage.getItem('token')).split(",")[3])?<span>{(empexist==='YES')?<FaLockOpen onClick={lockusr}/>:<FaLock onClick={lockusr}/>}<IoMdDownload onClick={downloadinfo}/></span>:""
                }
                </div>
            </div>
        </div>
        <div className='msg'>
            {msg}
        </div>
        <div>
            {(empid!==atob(sessionStorage.getItem('token')).split(",")[3])?<div className="editsnr">
            <Employeeprim fname={fname} setFname={setFname} usrname={usrname} mailid={mailid} phnno={phnno} setMailid={setMailid} setUsrname={setUsrname} setPhnno={setPhnno}
            empids={empids} setEmpids={setEmpids} postion={postion} setPosition={setPosition}/>
            </div>:""}
        </div>
        <div className='cmmn'>
            <div>
                <Employeesec adarcrd={aadhar} setAdarcrd={setAadharnum} pncrd={pncrd} setPncrd={setPncrd} addrs={addrs} setAddrs={setAddrs} fthrnme={fthrnme}
                setFthrnme={setFthrnme} mthrnme={mthrnme} setMthrnme={setMthrnme} spnme={spnme} setSpnme={setSpnme} tnthmrk={tnthmrk} settnthmrk={settnthmrk} tnthscl={tnthscl}
                setTnthscl={setTnthscl} twthmrk={twthmrk} setTwthmrk={setTwthmrk} twthclg={twthclg} setTwthclg={setTwthclg} gradmrk={gradmrk} setGradmrk={setGradmrk} gradclg={gradclg}
                setGradcld={setGradcld}/>
            </div>
        </div>
        <div align="center">
            <span><button onClick={svehandler}>Save</button></span>
            <span><button onClick={updateemp}>Cancel</button></span>
        </div>
    </div>
  )
}

export default Editemp