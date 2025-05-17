import React from 'react'
import logo from '../../../../assets/images/logo.png'

export default function VerifyAccount() {
  return (
    <>
   
       <div className="auth-container">
         <div className="container-fluid bg-overlay">
           <div className="row d-felx vh-100  justify-content-center align-items-center">
             <div className="col-md-5 bg-white rounded-3 px-5 py-4">
                 <div>
   
                   {/* logo */}
                   <div className='logo-container text-center mb-3'>
                     <img className='w-50' src={logo} alt="food-logo" />
                   </div>
   
                   {/* title */}
   
                   <div className="title mb-5">
                     <h4> Verify Account  </h4>
                     <span className='text-muted'>Please Enter Your Otp  or Check Your Inbox </span>
                   </div>
   
                   <form>
                     <div class="input-group mb-3">
                         <span class="input-group-text" id="basic-addon1">
                           <i class="fa fa-envelope"></i>
                         </span>
                         <input type="text" class="form-control" placeholder=" Email" aria-label="Username" aria-describedby="basic-addon1"/>
                     </div>
   
                      <div class="input-group mb-3">
                          <span class="input-group-text" id="basic-addon1">
                            <i class="fa fa-lock"></i>
                          </span>
                          <input type="text" class="form-control" placeholder="OTP" aria-label="Username" aria-describedby="basic-addon1"/>
                      </div>
   
                     <button className="btn btn-custom-green w-100 my-5">
                        Send
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
 