import React, {useContext, useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import RecipesImg from '../../../../assets/images/header.svg'
import { axiosInstance, baseImage, USERS_URLS, UsersLIST } from '../../../Services/urls'
import NoData from '../../../Shared/components/NoData/NoData'
import { AuthContext } from '../../../../context/AuthContext'
import { toast } from 'react-toastify'
import { Modal, Button } from 'react-bootstrap';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation'

export default function UserList() {

   let {loginData} = useContext (AuthContext)

  // ********* USE State ******************

  const [UserList , setUserList] = useState ([])
  const [userId , setUserId] = useState(0) 
  const [nameValue , setnameValue] = useState ('');
 



  // show and hide the model in delete
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = (id) =>
      {
  
        setUserId(id);
        setShow(true)
    };

    //show and hide view model 
        const [showView , setshowView] = useState(false);
        const [viewUser, setViewUser] = useState(null);

            //clsoe
             const handleCloseView = ()=>{
               setshowView (false)
              setViewUser(null)
             }

            //show
            const handleShowView  = (user) =>
              {
                setViewUser(user);
                  setshowView(true);
              }
  

  // *********** URLS APIS ***************

const getAllUser = async (name='')=>
{
  try{
    console.log("Searching for name:", name); // 👈 Add this
      let response = await axiosInstance.get(
        `${UsersLIST.GET_USERS}`,
        {params :{name}}
      );
      console.log(response.data.data);
      setUserList (response.data.data);
  }

  catch(error)
  {
      console.log(error);
      
  }
}

const deleteUser = async ()=>
{
  try
  {
    let response = await axiosInstance.delete (
      UsersLIST.DELETE_USER(userId)
    );
    getAllUser();
    handleClose()
    toast.success("User Deleted");
  }

  catch (error)
  {
    console.log(error);
    
  }
}


  //****************  pagination***********
  const getNameValue = (input)=>{
     setnameValue(input.target.value) // catch the value to sent to backend
     getAllUser(input.target.value) // sent it  
  }



  
// ************** Use Effect ***************
useEffect ( ()=>{
 getAllUser();
}, [] ) 










  return (
    
    <>
        <Header imgPath={RecipesImg} title={'Users List'} description={'You can now add your items that any user can order it from the Application and you can edit'}/>
    
    
    {/* Delete Model */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation  deleteItem={'User'}/>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    {/* End Of Delete Model  */}

          {/* View Modal */}
            <Modal show={showView} onHide={handleCloseView}>
              <Modal.Header closeButton>
                <Modal.Title>Category Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {viewUser && (
                  <div>
                    <p><strong>Name:</strong> {viewUser.userName}</p>
                    <p><strong>Email:</strong> {viewUser.email}</p>
                    <p><strong>phoneNumber:</strong> {viewUser.phoneNumber}</p>
                    <p><strong>phoneNumber:</strong> {viewUser.country}</p>
                    <p><strong>Created at:</strong> {new Date(viewUser.creationDate).toLocaleString()}</p>
    
                  
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseView}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

    
    {/* title */}
    <div className='title d-flex justify-content-between p-4 align-items-center'>
      <div className="titleCat">
        <h5>Users Table Details</h5>
      <p>You can check all details</p>
      </div>
       
    </div>


    <div className="p-5">
    <div className="row align-items-end">

        {/* Search by Name with Icon */}
          <div className="col-md-6">
            <div className="form-group position-relative mb-3">
              <i className="fa fa-search position-absolute" style={{ top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#aaa' }}></i>
              <input 
                type='text' 
                className='form-control ps-5' 
                placeholder='Search by name...' 
                onChange={getNameValue} 
              />
            </div>
          </div>
    </div>


      <table className='table table-striped p-2'>
        <thead>
          <th>Name</th>
          <th>Email</th>
          <th>Country</th>
          <th>Phone Number</th>
          <th>Role</th>
          <th>Creation</th>
          <th>Action</th>
          
        </thead>

        <tbody>
          {UserList.length>0 ? UserList.map( (user)=>  
          
          
          <tr>
            <td>{user.userName}</td>
            {/* <td> <img className='item-img' src= {`${baseImage}${user.imagePath}`} alt="" />   </td> */}
            <td>{user.email}</td>
            <td>{user.country}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.group.name}</td>
            <td>{new Date(user.creationDate).toLocaleString()}</td>

            <td>
              <i onClick={()=> handleShowView(user)} class="fa fa-eye mx-3" aria-hidden="true"></i>
               {loginData?.userGroup !='SystemUser'?   
          <i  onClick={()=> handleShow(user.id)} class="fa fa-trash text-danger" aria-hidden="true"></i> :''} 
            </td>
          
            
          </tr> 
          
          ): <NoData/> }
        </tbody>

      </table>


    </div>


    </>
  )
}
