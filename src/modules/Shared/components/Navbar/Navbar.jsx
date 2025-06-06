import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
export default function Navbar() {

     let {loginData} = useContext(AuthContext)
    console.log(loginData)


  return (
 
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
