import React, { useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import RecipesImg from '../../../../assets/images/header.svg'

export default function UserList() {

  // ********* USE State ******************

  const [UserList , serUserList] = useState ([])



  // *********** URLS APIS ***************

  











  return (
    
    <>
        <Header imgPath={RecipesImg} title={'Users List'} description={'You can now add your items that any user can order it from the Application and you can edit'}/>
    
    
    
    {/* title */}
    <div className='title d-flex justify-content-between p-4 align-items-center'>
      <div className="titleCat">
        <h5>Users Table Details</h5>
      <p>You can check all details</p>
      </div>
       
    </div>


    <div className="p-5">
      <table className='table table-striped'>
        <thead>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Description</th>
          <th>Discount</th>
          <th>Category</th>
        </thead>

        <tbody>

        </tbody>

      </table>
    </div>


    </>
  )
}
