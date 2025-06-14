import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';

export default function Header({ title, description, imgPath }) {
  const { loginData } = useContext(AuthContext);

  return (
    <div className="container custom-bg">
      <div className="row">
        <div className="col-md-8 d-flex align-items-center">
          <div className='header-title'>
            <h3>
              {title} {loginData?.userName || ''}
            </h3>
            <p>{description}</p>
          </div>
        </div>

        <div className="col-md-4 d-flex justify-content-end">
          {imgPath && <img src={imgPath} alt="header visual" className='header-img' />}
        </div>
      </div>
    </div>
  );
}
