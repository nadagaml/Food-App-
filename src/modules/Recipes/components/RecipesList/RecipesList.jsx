import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import RecipesImg from '../../../../assets/images/header.svg'
import {axiosInstance, baseImage, RECIPES_URLS} from '../../../Services/urls'
import NoData from '../../../Shared/components/NoData/NoData'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
export default function RecipesList() {

  let navigate = useNavigate()

// ********* USE State ******************

const [RecipesList , setRecipesList] =useState([])
const [recipeId , setrecipeId] = useState(0) 

// show and hide the model in delete
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) =>
    {

      setrecipeId(id);
      setShow(true)
  };

// *********** URLS APIS ***************

const getAllRecipes = async (pageSize , pageNumber) =>
{
  try
  {
    let response = await axiosInstance.get (
    `${RECIPES_URLS.GET_RECIPES}`,
    {params :{pageSize ,pageNumber}}
  );
  console.log(response.data.data)
  setRecipesList (response.data.data);
  }

  catch(error)
  {
    console.log(error)
  }

}


// Delete Categories by ID
const deleteRecipe = async ()=>{
 
  try{
      let resposne = await axiosInstance.delete(
        RECIPES_URLS.DELETE_RECIPY(recipeId)
      )

      getAllRecipes();
      handleClose()
      toast.success("category Deleted");
  }

  catch (error)
  {
    console.log(error)
  }

}

// Use Effect 

useEffect ( ()=>{
  getAllRecipes(5,1)
}, [] )




  return (
    <>
    <Header imgPath={RecipesImg} title={'Recipes Items'} description={'You can now add your items that any user can order it from the Application and you can edit'}/>
    

    {/* Delete Model */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation  deleteItem={'Recipe'}/>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="danger" onClick={deleteRecipe}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    {/* End Of Delete Model  */}



    {/* title */}
      <div className='title d-flex justify-content-between p-4 align-items-center'>
      <div className="titleCat">
        <h5>Recipe Table Details</h5>
      <p>You can check all details</p>
      </div>
        <button className='btn btn-custom-green' onClick={()=> navigate('/dashboard/recipe-data')}>
          Add New Item
        </button>
        </div>

      <input className='form-control w-50 m-3' />


      {/* Table */}

      <div className="p-5">
        <table className='table table-striped'>
          <thead>
            <th>Item Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Description</th>
            <th>tag</th>
            <th>Category</th>
            <th>Action</th>
          </thead>

          <tbody>
            {RecipesList.length>0 ? RecipesList.map( (item)=>
             <tr>
              <td> {item.name} </td>
              <td> <img className='item-img' src= {`${baseImage}${item.imagePath}`} alt="" />   </td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>{item.tag.name}</td>
              <td>{item.category[0].name}</td>
              <td> 
        <i class="fa fa-eye" aria-hidden="true"></i>
         <i className="fas fa-edit mx-2 text-warning"
   onClick={() => navigate('/dashboard/recipe-data', { state: { recipe: item } })}></i>
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
  