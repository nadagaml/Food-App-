import React from 'react';
import { useNavigate } from 'react-router-dom';
// import logo from '../../../../assets/images/logo.png';
export default function Navbar({ loginData }) {
  const navigate = useNavigate();
  console.log(loginData)

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   setLoginData(''); 
  //   navigate('/login');
  // };

  return (
  //  <nav className="navbar d-flex justify-content-between align-items-center px-4 py-2 bg-white shadow-sm">
  //     {/* Logo */}
  //     <div className="navbar-logo d-flex align-items-center">
  //       <img src={logo} alt="Logo" style={{ width: '100px' }} />
  //     </div>

  //     {/* User Greeting & Logout */}
  //     <div className="navbar-actions d-flex align-items-center">
  //       <span className="me-3 text-muted">Welcome back 👋</span>
  //       <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
  //         <i className="fa fa-sign-out-alt me-1"></i> Logout
  //       </button>
  //     </div>
  //   </nav>



<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">{loginData?.userName}</a>
        </li> 
      </ul>
    </div>
  </div>
</nav>

  );
}
