import React, { useState, useContext } from 'react';
import logo from '../../../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { saveLoginData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://upskilling-egypt.com:3006/api/v1/Users/Login',
        data
      );
      localStorage.setItem('token', response.data.token);
      saveLoginData();
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5 bg-white rounded-3 px-5 py-4">
            <div>
              <div className="logo-container text-center">
                <img className="w-50" src={logo} alt="food-logo" />
              </div>

              <div className="title my-3">
                <h4>Log In</h4>
                <span className="text-muted">
                  Welcome Back! Please enter your details
                </span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
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

                {/* Password */}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    {...register('password', {
                      required: 'Password is required !!',
                    })}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon2"
                  />
                </div>
                {errors.password && (
                  <span className="text-danger mb-2">
                    {errors.password.message}
                  </span>
                )}

                {/* Links */}
                <div className="links mb-3 d-flex justify-content-between">
                  <Link
                    to="/register"
                    className="text-black text-decoration-none"
                  >
                    Register Now ?
                  </Link>
                  <Link
                    to="/forget-pass"
                    className="text-success text-decoration-none"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  className="btn btn-custom-green w-100"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Logging in...
                    </span>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
