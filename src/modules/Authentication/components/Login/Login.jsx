import React from 'react'
import logo from '../../../../assets/images/logo.png'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
   
    <>
    
    <div className="auth-container">

    <div className="container-fluid bg-overlay">

      <div className="row vh-100  justify-content-center align-items-center" >
        <div className="col-md-5 bg-white rounded-3 px-5 py-4">

          <div>

            <div className="logo-container text-center">
              <img className='w-50' src={logo} alt="food-logo" />
            </div>

            <div className="title my-3">
              <h4>Log In</h4>
              <span className='text-muted'>Welcome Back! Please enter your details</span>
            </div>

            <form>

              <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="fa fa-envelope"></i>
                  </span>
                  <input type="text" class="form-control" placeholder="Enter your E-mail" aria-label="Username" aria-describedby="basic-addon1"/>
              </div>


              <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="fa fa-lock"></i>
                  </span>
                  <input type="text" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
              </div>

              <div className="links mb-3 d-flex justify-content-between ">
                <Link to='/register' className='text-black text-decoration-none'>Register Now ?</Link>
                <Link to='/forget-pass' className='text-success text-decoration-none'>Forgot Password?</Link>
              </div>

             <button className="btn btn-custom-green w-100">
                Login
              </button>

            </form>

          </div>

        </div>
      </div>

    </div>
      
    </div>

    </>
  )
}
