import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import SideBarLogo from '../../../../assets/images/SideBarLogo.png'
import { AuthContext } from '../../../../context/AuthContext';

export default function SideBar({onChangePasswordClick}) {

  const [iscollapsed , setIscollapsed] = useState(false)
  const navigate = useNavigate();

  // toggle of sidebar
  let togglecollapse =()=>{
    setIscollapsed(!iscollapsed)
  }

  // filter the sidebar as admin or user

     let {loginData} = useContext(AuthContext)


  // logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <>

 <div className="sideBar-cont">
     <Sidebar collapsed={iscollapsed}>
  <Menu>
    <MenuItem onClick={togglecollapse} className='my-5 sideBar-logo'> <img src={SideBarLogo} alt='sideBar logo'/></MenuItem>
    <MenuItem icon= {<i class="fa fa-home" aria-hidden="true"></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
    {loginData.userGroup == 'SuperAdmin' ? <MenuItem icon= {<i class="fa fa-users" aria-hidden="true"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem> :''}
    <MenuItem icon= {<i class="fa fa-cutlery" aria-hidden="true"></i>} component={<Link to="/dashboard/recipe" />}> Recipes </MenuItem>
    {loginData.userGroup =='SuperAdmin'?  <MenuItem icon= {<i class="fa fa-list" aria-hidden="true"></i>} component={<Link to="/dashboard/category" />}> Categories </MenuItem> :''}   
    {loginData.userGroup  !='SuperAdmin' ? <MenuItem icon= {<i class="fa fa-heart" aria-hidden="true"></i>} component={<Link to="/dashboard/favs" />}> Favourite </MenuItem> : ''}
    <MenuItem icon= {<i class="fa fa-key" aria-hidden="true"></i>} component={<Link to="/dashboard/change-pass" />}> Change Password </MenuItem>

    <MenuItem icon= {<i class="fa fa-sign-out" aria-hidden="true"></i>} onClick={handleLogout}> Logout </MenuItem>

  </Menu>
</Sidebar>;
 </div>

    </>
  )
}
