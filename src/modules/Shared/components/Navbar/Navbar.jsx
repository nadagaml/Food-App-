import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ setLoginData }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoginData(''); 
    navigate('/login');
  };

  return (
    <div className="d-flex justify-content-end p-3">
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
