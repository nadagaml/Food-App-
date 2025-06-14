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
  const [loading, setLoading] = useState(false);


 



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
  setLoading(true);
  try{
    
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
  finally {
    setLoading(false); 
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

<Modal show={showView} onHide={handleCloseView} centered size="md">
  <Modal.Header closeButton>
    <Modal.Title className="fw-bold text-success">
      <i className="fa fa-user-circle me-2"></i> User Details
    </Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {viewUser && (
      <div className="p-3">
        <div className="mb-3 d-flex align-items-center">
          <i className="fa fa-user text-success me-2"></i>
          <strong className="me-2">Name:</strong>
          <span>{viewUser.userName}</span>
        </div>

        <div className="mb-3 d-flex align-items-center">
          <i className="fa fa-envelope text-primary me-2"></i>
          <strong className="me-2">Email:</strong>
          <span>{viewUser.email}</span>
        </div>

        <div className="mb-3 d-flex align-items-center">
          <i className="fa fa-phone text-warning me-2"></i>
          <strong className="me-2">Phone:</strong>
          <span>{viewUser.phoneNumber}</span>
        </div>

        <div className="mb-3 d-flex align-items-center">
          <i className="fa fa-globe text-info me-2"></i>
          <strong className="me-2">Country:</strong>
          <span>{viewUser.country}</span>
        </div>

        <div className="mb-3 d-flex align-items-center">
          <i className="fa fa-calendar text-secondary me-2"></i>
          <strong className="me-2">Created At:</strong>
          <span>{new Date(viewUser.creationDate).toLocaleString()}</span>
        </div>
      </div>
    )}
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseView}>
      <i className="fa fa-times me-1"></i> Close
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

{loading ? (
  <div className="text-center my-5">
    <div className="spinner-border text-success" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
) : (
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
  <div className="dropdown text-center">
    <i
      className="fa fa-ellipsis-h fs-5 cursor-pointer"
      id={`dropdownMenuButton${user.id}`}
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{ color: '#198754', cursor: 'pointer' }}
    ></i>

    <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${user.id}`}>
      <li>
        <button
          className="dropdown-item text-primary d-flex align-items-center"
          onClick={() => handleShowView(user)}
        >
          <i className="fa fa-eye me-2"></i> View
        </button>
      </li>

      {loginData?.userGroup !== 'SystemUser' && (
        <li>
          <button
            className="dropdown-item text-danger d-flex align-items-center"
            onClick={() => handleShow(user.id)}
          >
            <i className="fa fa-trash me-2"></i> Delete
          </button>
        </li>
      )}
    </ul>
  </div>
</td>


          
            
          </tr> 
          
          ): <NoData/> }
        </tbody>

      </table>
)}

    </div>


    </>
  )
}
