import React, { useEffect, useState } from 'react'

const Attendancecalender = ({getmonth,calculateDaysInMonth,val=0,serverurl,refresh}) => {

    const getdetails = getmonth(val)
    const days_array = []
    var counter = 1
    var line_map = new Map()
    var mark = 0
    let oth_arr = []
    var marker = 1
    const empid = atob(sessionStorage.getItem('token')).split(",")[3]
    const Month = getdetails[3]
    const year = getdetails[1]
    const url = serverurl
    const [data,setData] = useState({})

    const month_to_num = {
        'January':1,
        'February':2,
        'March':3,
        'April':4,
        'May':5,
        'June':6,
        'July':7,
        'August':8,
        'September':9,
        'October':10,
        'November':11,
        'December':12
    }
    for(let i = 1;i<=getdetails[2];i++){
        days_array.push(calculateDaysInMonth(getdetails[1],month_to_num[getdetails[0]],i))
    }

    for(let j = 0;j<days_array.length;j++){
        if (days_array[j]==='Sunday'){
            counter = counter + 1
        }
    }

    for(let k=0;k<counter;k++){
        line_map.set(k,[])
    }
    

    for(let l=0;l<line_map.size;l++){
        for(let m = mark;m<mark+8;m++){
            if (m === mark+7||days_array[m]==='Saturday'){
                if(days_array[m]){
                    line_map.get(l).push(days_array[m])
                    mark = m+1
                    break
                }
                else{
                    break
                }
            }
            else{
                line_map.get(l).push(days_array[m])
            }
        }
    }
    if (line_map.get(0)[0]==='Monday'){
        oth_arr = ['']
        for(let n=0;n<line_map.get(0).length;n++){
            oth_arr.push(line_map.get(0)[n])
        }
    }
    if (line_map.get(0)[0]==='Tuesday'){
        oth_arr = ['','']
        for(let n=0;n<line_map.get(0).length;n++){
            oth_arr.push(line_map.get(0)[n])
        }
    }
    if (line_map.get(0)[0]==='Wednesday'){
        oth_arr = ['','','']
        for(let n=0;n<line_map.get(0).length;n++){
            oth_arr.push(line_map.get(0)[n])
        }
    }
    if (line_map.get(0)[0]==='Thursday'){
        oth_arr = ['','','','']
        for(let n=0;n<line_map.get(0).length;n++){
            oth_arr.push(line_map.get(0)[n])
        }
    }
    if (line_map.get(0)[0]==='Friday'){
        oth_arr = ['','','','','']
        for(let n=0;n<line_map.get(0).length;n++){
            oth_arr.push(line_map.get(0)[n])
        }
    }
    if (line_map.get(0)[0]==='Saturday'){
        oth_arr = ['','','','','','']
        for(let n=0;n<line_map.get(0).length;n++){
            oth_arr.push(line_map.get(0)[n])
        }
    }
    line_map.set(0,oth_arr)
    for(let q =0;q<line_map.size;q++){
        for(let r = 0;r<line_map.get(q).length;r++){
            if(line_map.get(q)[r] !== ''){
                if(line_map.get(q)[r]){
                    line_map.get(q)[r] = marker
                    marker = marker + 1 
                }
            }
        }
    }
    useEffect(()=>{
        const get_date_class = async () =>{
            const response = await fetch(`${url.serverurl}/getattendance`,{
                method:'POST',
                headers: {'Content-Type' : 'application/json'},
                body:JSON.stringify({empid,Month,year})
            })
            const result = await response.json()
            if(result){
                setData(result)
            }
        }
        get_date_class()
    },[Month,year,empid,url.serverurl,refresh])


  return (
    <span className='calenders'>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>{getdetails[0]}</th>
                    <th>-</th>
                    <th>{getdetails[1]}</th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody>
            {Array.from(line_map.entries()).map(([key, value]) => (
                    <tr key={key}>
                         <td className={(value[0])?(data[value[0]]==="O")?"Office":(data[value[0]]==="H")?"Whome":(data[value[0]]==="C")?"Client":"":""}>{value[0]}</td>
                         <td className={(value[1])?(data[value[1]]==="O")?"Office":(data[value[1]]==="H")?"Whome":(data[value[1]]==="C")?"Client":"":""}>{value[1]}</td>
                         <td className={(value[2])?(data[value[2]]==="O")?"Office":(data[value[2]]==="H")?"Whome":(data[value[2]]==="C")?"Client":"":""}>{value[2]}</td>
                         <td className={(value[3])?(data[value[3]]==="O")?"Office":(data[value[3]]==="H")?"Whome":(data[value[3]]==="C")?"Client":"":""}>{value[3]}</td>
                         <td className={(value[4])?(data[value[4]]==="O")?"Office":(data[value[4]]==="H")?"Whome":(data[value[4]]==="C")?"Client":"":""}>{value[4]}</td>
                         <td className={(value[5])?(data[value[5]]==="O")?"Office":(data[value[5]]==="H")?"Whome":(data[value[5]]==="C")?"Client":"":""}>{value[5]}</td>
                         <td className={(value[6])?(data[value[6]]==="O")?"Office":(data[value[6]]==="H")?"Whome":(data[value[6]]==="C")?"Client":"":""}>{value[6]}</td>
                     </tr>
                ))}  
            </tbody>
        </table>
    </span>
  )
}

export default Attendancecalender