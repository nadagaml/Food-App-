import React, { useState } from 'react';
import logo from '../../../../assets/images/logo.png';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../Services/urls';

export default function ChangePass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false); 

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axiosInstance.put(USERS_URLS.CHANGE_PASSWORD, data);
      toast.success('Password changed successfully!');
      reset();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || 'Failed to change password.'
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
            <div className="logo-container text-center">
              <img className="w-50" src={logo} alt="logo" />
            </div>

            <div className="title my-3 text-center">
              <h4>Change Password</h4>
              <span className="text-muted">
                Please enter your current and new password.
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Old Password */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Old Password"
                  {...register('oldPassword', {
                    required: 'Old password is required!',
                  })}
                />
              </div>
              {errors.oldPassword && (
                <span className="text-danger">{errors.oldPassword.message}</span>
              )}

              {/* New Password */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  {...register('newPassword', {
                    required: 'New password is required!',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters.',
                    },
                  })}
                />
              </div>
              {errors.newPassword && (
                <span className="text-danger">{errors.newPassword.message}</span>
              )}

              {/* Confirm New Password */}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
                  {...register('confirmNewPassword', {
                    required: 'Please confirm your new password!',
                    validate: (value) =>
                      value === watch('newPassword') || 'Passwords do not match!',
                  })}
                />
              </div>
              {errors.confirmNewPassword && (
                <span className="text-danger">{errors.confirmNewPassword.message}</span>
              )}

              {/* Submit Button */}
              <button className="btn btn-custom-green w-100" type="submit" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  'Change Password'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
