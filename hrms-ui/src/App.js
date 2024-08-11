import React, { useEffect, useState } from 'react'
import { BrowserRouter,Navigate,Route, Routes} from 'react-router-dom';
import './App.scss'
import Login from './Components/login';
import Home from './Components/home';
import Header from './Components/header';
import Footer from './Components/footer';
import Forgotpasswordform from './Components/Forgotpasswordform';
import Register from './Components/Register';

const App = () => {
  const serverurl = 'http://127.0.0.1:5000/';
  const [issuperadminexist,setIssuperadminexist] = useState('false')
  const [refresh,setrefresh] = useState(0)

  useEffect(()=>{
    const is_super_admin_exist = async () =>{
      const response = await fetch(`${serverurl}superadmin`)
      const result = await response.json()
      setIssuperadminexist(result)
    }
    is_super_admin_exist()
  },)

  return (
    <div className='App'>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Login serverurl={serverurl}/>}></Route>
          <Route path='/Register' Component={()=>(issuperadminexist==='false')?<Register serverurl={serverurl} setrefresh={setrefresh} refresh={refresh}/>:<Navigate to="/"/>}></Route>
          <Route path='/Home/*' Component = {()=> (atob(sessionStorage.getItem('token')).split(",")[0]==='true' && atob(sessionStorage.getItem('token')).split(",").length === 4)?<Home serverurl={serverurl}/>:<Navigate to="/"/>}></Route>
          <Route path='/Resetpassword' element={<Forgotpasswordform serverurl={serverurl}/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App