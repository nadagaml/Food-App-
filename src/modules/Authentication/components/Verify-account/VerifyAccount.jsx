import React, { useState } from 'react'
import logo from '../../../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../Services/urls';

export default function VerifyAccount() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  let {register , formState: { errors },handleSubmit} = useForm();

  const onSubmit = async (data)=>
  {
    try{
        const response = await axiosInstance.put( USERS_URLS.USER_VERIFY, data); 
        toast.success('Registered successfully!')
        navigate('/login')
    }
    catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
  }



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
   
                   <form onSubmit={handleSubmit(onSubmit)}>
                     <div class="input-group mb-3">
                        <span class="input-group-text" id="email-addon">
                          <i class="fa fa-envelope"></i>
                        </span>
                        <input type="text" 
                        class="form-control"
                        placeholder="Email" aria-label="Email" aria-describedby="email-addon"
                        {...register ('email' , { required: 'Email is required' })}
                         
                         />
                      </div>

                      <div class="input-group mb-3">
                        <span class="input-group-text" id="otp-addon">
                          <i class="fa fa-lock"></i>
                        </span>
                        <input type="text"
                         class="form-control" 
                         placeholder="OTP" aria-label="One-time password" aria-describedby="otp-addon"
                         {...register ('code' , { required: 'Email is required' })}
                         />
                      </div>

   
                     <button className="btn btn-custom-green w-100 my-5" type='submit' disabled={loading}>
                         {loading ? (
                    <span>
                      <i className="fa fa-spinner fa-spin me-2"></i> Sending...
                    </span>
                  ) : (
                    'Send'
                  )}
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
 