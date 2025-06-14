import React, { useState } from 'react'
import logo from '../../../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { axiosInstance, USERS_URLS } from '../../../Services/urls'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const res = await axiosInstance.post(USERS_URLS.REGISTER, data)
      toast.success('Registered successfully!')
      reset()
      navigate('/verify-account')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row d-felx vh-100 justify-content-center align-items-center">
          <div className="col-md-7 bg-white rounded-3 px-5 py-4">
            <div>
              <div className="logo-container text-center mb-3">
                <img className="w-50" src={logo} alt="food-logo" />
              </div>

              <div className="title mb-5">
                <h4>Register</h4>
                <span className="text-muted">Please fill in the information to register.</span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fa fa-user"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        {...register('userName', { required: 'Username is required' })}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fa fa-flag"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        {...register('country', { required: 'Country is required' })}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fa fa-lock"></i></span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        {...register('password', {
                          required: 'Password is required',
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/,
                            message:
                              'Password must include at least one lowercase, uppercase, digit, special character, and be 6+ characters',
                          },
                        })}
                      />
                    </div>
                    {errors.password && (
  <small className="text-danger">{errors.password.message}</small>
)}
                  </div>

                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        {...register('email', { required: 'Email is required' })}
                      />
                      
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fa fa-phone"></i></span>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone Number"
                        {...register('phoneNumber', { required: 'Phone number is required' })}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="fa fa-lock"></i></span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        {...register('confirmPassword', { required: 'Confirm your password' })}
                      />
                    </div>
                  </div>
                </div>

                <div className="links mb-3 d-flex justify-content-end">
                  <Link to="/login" className="text-success text-decoration-none">Login Now?</Link>
                </div>

                <button type="submit" className="btn btn-custom-green w-100 my-5" disabled={loading}>
                  {loading ? (
                    <span>
                      <i className="fa fa-spinner fa-spin me-2"></i> Registering...
                    </span>
                  ) : (
                    'Register'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
