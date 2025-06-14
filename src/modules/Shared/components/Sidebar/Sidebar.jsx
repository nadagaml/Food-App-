import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import SideBarLogo from '../../../../assets/images/SideBarLogo.png'
import { AuthContext } from '../../../../context/AuthContext';

export default function SideBar({ onChangePasswordClick }) {

  const [iscollapsed, setIscollapsed] = useState(false)
  const navigate = useNavigate();

  const togglecollapse = () => {
    setIscollapsed(!iscollapsed)
  }

  const { loginData } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="sideBar-cont">
      <Sidebar collapsed={iscollapsed}>
        <Menu>
          <MenuItem onClick={togglecollapse} className='my-5 sideBar-logo'>
            <img src={SideBarLogo} alt='sideBar logo' />
          </MenuItem>

          <MenuItem icon={<i className="fa fa-home" />} component={<Link to="/dashboard" />}> Home </MenuItem>

          {loginData?.userGroup === 'SuperAdmin' && (
            <MenuItem icon={<i className="fa fa-users" />} component={<Link to="/dashboard/users" />}> Users </MenuItem>
          )}

          <MenuItem icon={<i className="fa fa-cutlery" />} component={<Link to="/dashboard/recipe" />}> Recipes </MenuItem>

          {loginData?.userGroup === 'SuperAdmin' && (
            <MenuItem icon={<i className="fa fa-list" />} component={<Link to="/dashboard/category" />}> Categories </MenuItem>
          )}

          {loginData?.userGroup !== 'SuperAdmin' && (
            <MenuItem icon={<i className="fa fa-heart" />} component={<Link to="/dashboard/favs" />}> Favourite </MenuItem>
          )}

          <MenuItem icon={<i className="fa fa-key" />} onClick={onChangePasswordClick}> Change Password </MenuItem>

          <MenuItem icon={<i className="fa fa-sign-out" />} onClick={handleLogout}> Logout </MenuItem>

        </Menu>
      </Sidebar>
    </div>
  )
}
