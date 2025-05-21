import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import SideBarLogo from '../../../../assets/images/SideBarLogo.png'

export default function SideBar() {

  const [iscollapsed , setIscollapsed] = useState(false)

  let togglecollapse =()=>{
    setIscollapsed(!iscollapsed)
  }

  return (
    <>

 <div className="sideBar-cont">
     <Sidebar collapsed={iscollapsed}>
  <Menu>
    <MenuItem onClick={togglecollapse} className='my-5 sideBar-logo'> <img src={SideBarLogo} alt='sideBar logo'/></MenuItem>
    <MenuItem icon= {<i class="fa fa-home" aria-hidden="true"></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
    <MenuItem icon= {<i class="fa fa-users" aria-hidden="true"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>
    <MenuItem icon= {<i class="fa fa-cutlery" aria-hidden="true"></i>} component={<Link to="/dashboard/recipe" />}> Recipes </MenuItem>
    <MenuItem icon= {<i class="fa fa-list" aria-hidden="true"></i>} component={<Link to="/dashboard/category" />}> Categories </MenuItem>
    <MenuItem icon= {<i class="fa fa-key" aria-hidden="true"></i>} component={<Link to="/dashboard/users" />}> Change Password </MenuItem>
    <MenuItem icon= {<i class="fa fa-sign-out" aria-hidden="true"></i>}> Logout </MenuItem>

  </Menu>
</Sidebar>;
 </div>

    </>
  )
}
