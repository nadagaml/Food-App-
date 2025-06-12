import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'


export default function Header({title , description ,imgPath ,showChangePasswordModal, closeModal  }) {


  let {loginData} = useContext(AuthContext)
 

  return (
    <>
    
    <div className="container custom-bg">
      <div className="row ">
        <div className="col-md-8  d-flex align-items-center">
          <div className='header-title'>
            <h3>{title} {loginData?.userName}</h3>
          <p>{description}</p>
          </div>
        </div>

        <div className="col-md-4  d-flex justify-content-end">
          <img src={imgPath} alt="" className='header-img' />
        </div> 

      </div>
    </div>
    

   <showChangePasswordModal 
    show={showChangePasswordModal}
    handleClose={closeModal}
   />

    

    </>
  )
} 
