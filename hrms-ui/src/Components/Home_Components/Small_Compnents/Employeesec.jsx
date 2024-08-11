import React from 'react'

const Employeesec = ({adarcrd,setAdarcrd,pncrd,setPncrd,addrs,setAddrs,fthrnme,setFthrnme,mthrnme,setMthrnme,spnme,setSpnme,tnthmrk,settnthmrk,tnthscl,setTnthscl,twthmrk,setTwthmrk,twthclg,setTwthclg,gradmrk,setGradmrk,gradclg,setGradcld}) => {


  return (
    <div className='Employeesec'>
        <table>
            <tbody>
                <tr>
                    <td><label htmlFor='adnum'>Aadhar Card:</label></td>
                    <td><input type='text' placeholder='Enter Aadhar Number' value={adarcrd} onChange={(e)=>{setAdarcrd(e.target.value)}}/></td>
                    <td><label htmlFor='pnum'>PAN Card:</label></td>
                    <td><input type='text' placeholder='Enter Pan Card Number' name='pnum' value={pncrd} onChange={(e)=>{setPncrd(e.target.value)}}/></td>
                    <td><label htmlFor='add'>Address:</label></td>
                    <td><textarea rows="3" cols="30" type='text' placeholder='Enter Full Address' name='add' value={addrs} onChange={(e)=>{setAddrs(e.target.value)}}/></td>
                </tr>
                <tr>
                    <td><label htmlFor='fthernme'>Father Name:</label></td>
                    <td><input type='text' placeholder='Enter Fathers Name' name='fthernme' value={fthrnme} onChange={(e)=>{setFthrnme(e.target.value)}}/></td>
                    <td><label htmlFor='Mname'>Mothers Name:</label></td>
                    <td><input type='text' placeholder='Enter Mothers Name' name='Mname' value={mthrnme} onChange={(e)=>{setMthrnme(e.target.value)}}/></td>
                    <td><label htmlFor='Sname'>Spouce Name:</label></td>
                    <td><input type='text' placeholder='Enter Spouce Name' value={spnme} onChange={(e)=>{setSpnme(e.target.value)}}/></td>
                </tr>
                <tr>
                    <td><label htmlFor='tnthper'>10th Mark:</label></td>
                    <td><input type='text' placeholder='Enter 10th Percentage' name='tnthper' value={tnthmrk} onChange={(e)=>{settnthmrk(e.target.value)}}/></td>
                    <td><label htmlFor='tnthscl'>10th School:</label></td>
                    <td><input type='text' placeholder='Enter 10th School' name='tnthscl' value={tnthscl} onChange={(e)=>{setTnthscl(e.target.value)}}/></td>
                    <td><label htmlFor='12thper'>12th Mark:</label></td>
                    <td><input type='text' placeholder='Enter 12th Percentage' name='12thper' value={twthmrk} onChange={(e)=>{setTwthmrk(e.target.value)}}/></td>
                </tr>
                <tr>
                    <td><label htmlFor='12thclg'>12th College:</label></td>
                    <td><input type='text' placeholder='Enter 12th College' name='12thclg'value={twthclg} onChange={(e)=>{setTwthclg(e.target.value)}}/></td>
                    <td><label htmlFor='Gradmrk'>Graduation Mark:</label></td>
                    <td><input type='text' placeholder='Enter Graduation Mark' name='Gradmrk' value={gradmrk} onChange={(e)=>{setGradmrk(e.target.value)}}/></td>
                    <td><label htmlFor='GradCollege'>Graduation College:</label></td>
                    <td><input type='text' placeholder='Enter Graduation College' name='GradCollege' value={gradclg} onChange={(e)=>{setGradcld(e.target.value)}}/></td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Employeesec