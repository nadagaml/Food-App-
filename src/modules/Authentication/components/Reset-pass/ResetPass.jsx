import React from 'react';
import logo from '../../../../assets/images/logo.png';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPass() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset', {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        seed: data.seed, // OTP
      });

      toast.success('Password reset successfully!', {
        position: 'top-right',
      });

      navigate('/login');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to reset password. Please check the OTP and try again.',
        { position: 'top-right' }
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row d-flex vh-100 justify-content-center align-items-center">
          <div className="col-md-5 bg-white rounded-3 px-5 py-4">
            <div>
              {/* Logo */}
              <div className="logo-container text-center mb-3">
                <img className="w-50" src={logo} alt="food-logo" />
              </div>

              {/* Title */}
              <div className="title mb-4 text-center">
                <h4>Reset Password</h4>
                <span className="text-muted">Please enter your email and the OTP sent to your inbox.</span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                </div>
                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                {/* OTP / seed */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-key"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="OTP Code"
                    {...register('seed', { required: 'OTP is required' })}
                  />
                </div>
                {errors.seed && <p className="text-danger">{errors.seed.message}</p>}

                {/* New Password */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    {...register('password', {
                      required: 'New password is required',
                      minLength: { value: 6, message: 'Minimum 6 characters required' },
                    })}
                  />
                </div>
                {errors.password && <p className="text-danger">{errors.password.message}</p>}

                {/* Confirm Password */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm New Password"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === watch('password') || 'Passwords do not match',
                    })}
                  />
                </div>
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}

                {/* Submit */}
                <button type="submit" className="btn btn-custom-green w-100 my-4">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
