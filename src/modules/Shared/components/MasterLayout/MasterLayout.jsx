import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'
import SideBar from '../Sidebar/Sidebar'

export default function MasterLayout() {

  let {loginData} = useContext(AuthContext)

    console.log(loginData)

  return (
    <>

   <div className="layout-container">
  <div className="sideBar-cont">
    <SideBar />
  </div>

  <div className="main-content w-100">
    <Navbar loginData={loginData} />
    <Outlet />
  </div>
</div>

    
    
    </>
  )
}
