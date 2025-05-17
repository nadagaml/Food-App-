import React from 'react'
import logo from '../../../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ForgetPass() {


    const navigate = useNavigate();

     let {
       register,
       formState: { errors },
       handleSubmit,
     } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',
        {email : data.email}
      );
      console.log(response);

      toast.success('Password reset link sent! Please check your email.', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/reset-pass');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };
  return (
    <>

    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row d-felx vh-100  justify-content-center align-items-center">
          <div className="col-md-6 bg-white rounded-3 px-5 py-4">
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

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    {...register('email', {
                      required: 'E-mail is required !!!',
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Email Not Valid, Please enter valid E-mail',
                      },
                    })}
                    type="text"
                    className="form-control"
                    placeholder="Enter your E-mail"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                  />
                </div>
                {errors.email && (
                  <span className="text-danger m-2">
                    {errors.email.message}
                  </span>
                )}


                  <button className="btn btn-custom-green w-100 my-5">
                     Submit
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
