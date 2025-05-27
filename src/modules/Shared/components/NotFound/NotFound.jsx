import React from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorImg from '../../../../assets/images/404.png'
import BgPattern from '../../../../assets/images/Vector.png'
import Logo from '../../../../assets/images/logo.png' 

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="position-relative bg-light min-vh-100 overflow-hidden">
      {/* LOGO */}
      <div className="position-absolute top-0 start-0 p-4">
        <img src={Logo} alt="Logo" style={{ height: '80px' }} />
      </div>

      {/* BACKGROUND VECTOR */}
      <div
        className="position-absolute top-0 end-0 h-100"
        style={{
          backgroundImage: `url(${BgPattern})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'right',
          width: '60%',
          zIndex: 0,
          opacity: 0.3,
        }}
      />

      {/* MAIN CONTENT */}
      <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 position-relative" style={{ zIndex: 1 }}>
        <div className="row w-100 container-fluid">
          {/* TEXT SECTION */}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1 className="display-4 fw-bold text-dark">Oops.</h1>
            <h2 className="text-success">
              Page <span className="text-dark">not found</span>
            </h2>
            <p className="text-muted mt-3">
              This page doesn’t exist or was removed!
              <br />
              We suggest you back to home.
            </p>
            <button
              className="btn btn-success mt-3 px-4 py-2 w-50 text-white fw-semibold"
              onClick={() => navigate('/login')}
            >
              &larr; Back To Home
            </button>
          </div>

          {/* IMAGE SECTION */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={ErrorImg}
              alt="404 illustration"
              className="img-fluid"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
