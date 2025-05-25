import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import imgCat from '../../../../assets/images/header.svg'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NoData from '../../../Shared/components/NoData/NoData'
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import { useForm } from 'react-hook-form';


export default function CategoriesList() {

const [CategoriesList , setCategoriesList] =useState ([])
const [catId , setCatId] = useState(0) 

// Add
let {register , formState:{errors} , handleSubmit } = useForm()


// show and hide the model in delete
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) =>
    {

      setCatId(id);;
      setShow(true)
  };


  // show and hide the model in Add
  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () =>  setShowAdd(true)



// Show All Categories
const getAllCategories = async()=>{
  try {
      let respons = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=5&pageNumber=1' ,{
        headers:{
          Authorization : localStorage.getItem('token')
        }
      })
      // console.log(respons.data.data);
      setCategoriesList(respons.data.data)
  }
  catch (error) {
      console.log(error);
  }
}

// Delete Categories by ID
const deleteCategory = async ()=>{
 
  try{
      let resposne = await axios.delete (`https://upskilling-egypt.com:3006/api/v1/Category/${catId}` , 
        { headers :{
          Authorization : localStorage.getItem('token')
        }}
      )

      getAllCategories();
      handleClose()
  }

  catch (error)
  {
    console.log(error)
  }

}

// Add Categories
const addCategories  = async (data)=>
{

  try{
  let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Category/' , data , {headers : {
    Authorization : localStorage.getItem('token')
  }})

  getAllCategories()
  handleCloseAdd()
  }
  catch(error)
  {
      console.log(error)
  }

}

// Function to make event in html pages
useEffect ( ()=>{
  getAllCategories()
}  , [])

  return (
    <>
    
  <Header imgPath={imgCat} title={'Categories Item'} description={'You can now add your items that any user can order it from the Application and you can edit'}/>



    {/* Delete Model */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation  deleteItem={'category'}/>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="danger" onClick={deleteCategory}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    {/* End Of Delete Model  */}


        {/* Add Model */}

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
         Add Category 
        </Modal.Header>
        <Modal.Body>
          
          <form onSubmit={handleSubmit(addCategories)}>
                 <input
                    {...register('name', {
                      required: 'Name is required !!!',
                     
                    })}
                    type="text"
                    className="form-control"
                    placeholder="Category Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                  />
              
                {errors.name && (
                  <p className="text-danger m-2">
                    {errors.name.message}
                  </p>
                )}

                {/* Submit Button */}
                <button className="btn btn-custom-green float-end mt-3" type="submit">
                  Save
                </button>
          </form>

        </Modal.Body>
      </Modal>
        {/* End Of Add Model  */}




    <div className='title d-flex justify-content-between p-4 align-items-center'>
      <div className="titleCat">
        <h5>Categories Table Details</h5>
      <p>You can check all details</p>
      </div>
        <button className='btn btn-custom-green' onClick={handleShowAdd}>Add New Category</button>
    </div>


      <div className="p-5">
        <table class="table table-striped ">
      <thead className=''>
        <th>Name</th>
        <th>Creation date</th>
        <th>Actions</th>
      </thead>

    <tbody>

    { CategoriesList.length>0 ? CategoriesList.map((item)=>
      <tr> 
        <td> {item.name} </td> 
        <td> {item.creationDate} </td> 

        <td> 

          {/* button toggle */}

          {/* <div class="btn-group dropstart">
            <button type="button" class="btn btn-secondary " data-bs-toggle="dropdown" aria-expanded="false">
              :
            </button>
            <ul class="dropdown-menu">
             <i class="fa fa-eye" aria-hidden="true"></i>
         <i class="fas fa-edit" aria-hidden="true"></i>
         <i class="fa fa-trash" aria-hidden="true"></i>
            </ul>
          </div> */}

           <i class="fa fa-eye" aria-hidden="true"></i>
         <i class="fas fa-edit mx-2 text-warning" aria-hidden="true"></i>
         <i  onClick={()=> handleShow(item.id)} class="fa fa-trash text-danger" aria-hidden="true"></i>

        
        </td> 

      </tr>
    ) : <NoData/> } 
    </tbody>
</table>
</div>




    </>
  )
}
 