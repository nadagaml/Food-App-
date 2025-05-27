import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

export default function MasterLayout({ loginData }) {

    console.log(loginData)

  return (
    <>

    <div className='d-flex'>
      <div className="">
            <Sidebar/>
      </div>

      <div className="w-100">
        <Navbar  loginData={loginData}/>
        {/* <Header/> */}
        <Outlet/>
      </div>
      
    </div>
    
    
    </>
  )
}
