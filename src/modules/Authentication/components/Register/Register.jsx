import React from 'react'
import logo from '../../../../assets/images/logo.png'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
  
     <>

    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row d-felx vh-100  justify-content-center align-items-center">
          <div className="col-md-7 bg-white rounded-3 px-5 py-4">
              <div>

                {/* logo */}
                <div className='logo-container text-center mb-3'>
                  <img className='w-50' src={logo} alt="food-logo" />
                </div>

                {/* title */}

                <div className="title mb-5">
                  <h4>Forgot Your Password?</h4>
                  <span className='text-muted'>No worries! Please enter your email and we will send a password reset link </span>
                </div>

                <form>
                 <div className="row">

                  <div className="col-md-6">
                     <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa fa-mobile"></i>
                      </span>
                      <input type="text" class="form-control" placeholder="Enter your email" aria-label="Username" aria-describedby="basic-addon1"/>
                      </div>

                       <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa fa-mobile"></i>
                      </span>
                      <input type="text" class="form-control" placeholder="Enter your email" aria-label="Username" aria-describedby="basic-addon1"/>
                      </div>

                       <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa fa-mobile"></i>
                      </span>
                      <input type="text" class="form-control" placeholder="Enter your email" aria-label="Username" aria-describedby="basic-addon1"/>
                      </div>
                      
                  </div>



                  <div className="col-md-6">
                      <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa fa-mobile"></i>
                      </span>
                      <input type="text" class="form-control" placeholder="Enter your email" aria-label="Username" aria-describedby="basic-addon1"/>
                      </div>

                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa fa-mobile"></i>
                      </span>
                      <input type="text" class="form-control" placeholder="Enter your email" aria-label="Username" aria-describedby="basic-addon1"/>
                      </div>

                      <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <i class="fa fa-mobile"></i>
                      </span>
                      <input type="text" class="form-control" placeholder="Enter your email" aria-label="Username" aria-describedby="basic-addon1"/>
                      </div>

                  </div>
                 </div>


              <div className="links mb-3 d-flex justify-content-end ">
                <Link to='/forget-pass' className='text-success text-decoration-none'>Login Now?</Link>
              </div>

                  <button className="btn btn-custom-green w-100 my-5">
                     Register
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
 