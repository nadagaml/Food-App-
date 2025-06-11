import React, { use, useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import RecipesImg from '../../../../assets/images/header.svg'
import { axiosInstance, baseImage, UsersLIST } from '../../../Services/urls'
import NoData from '../../../Shared/components/NoData/NoData'

export default function UserList() {

  // ********* USE State ******************

  const [UserList , setUserList] = useState ([])



  // *********** URLS APIS ***************

const getAllUser = async ()=>
{
  try{
      let response = await axiosInstance.get(
        `${UsersLIST.GET_USERS}`
      );
      console.log(response.data.data);
      setUserList (response.data.data);
  }

  catch(error)
  {
      console.log(error);
      
  }
}

  
// Use Effect 

useEffect ( ()=>{
 getAllUser();
}, [] ) 










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
          <th>Email</th>
          <th>Country</th>
          <th>Phone Number</th>
          <th>Creation</th>
          <th>Action</th>
          
        </thead>

        <tbody>
          {UserList.length>0 ? UserList.map( (user)=>  
          
          
          <tr>
            <td>{user.userName}</td>
            <td> <img className='item-img' src= {`${baseImage}${user.imagePath}`} alt="" />   </td>
            <td>{user.email}</td>
            <td>{user.country}</td>
            <td>{user.phoneNumber}</td>
            <td>{new Date(user.creationDate).toLocaleString()}</td>
            <td>{new Date(user.creationDate).toLocaleDateString()}</td>
          
            
          </tr> 
          
          ): <NoData/> }
        </tbody>

      </table>
    </div>


    </>
  )
}
