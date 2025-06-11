import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import RecipesImg from '../../../../assets/images/header.svg'
import {axiosInstance, baseImage, CATEGORIES_URLS, RECIPES_URLS, TAGS_URLS, USER_FAVS_URL} from '../../../Services/urls'
import NoData from '../../../Shared/components/NoData/NoData'
import { data, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import { AuthContext } from '../../../../context/AuthContext'
export default function RecipesList() {

  let navigate = useNavigate()
  let {loginData} = useContext (AuthContext)

// ********* USE State ******************

const [RecipesList , setRecipesList] =useState([])
const [recipeId , setrecipeId] = useState(0) 
const [arrayOfPages , setArrayOfPages] = useState ([]);
const [tagesList, settagesList] = useState([]);
const [CategoriesList, setCategoriesList] = useState([]);
const [nameValue , setnameValue] = useState ('');
const [tagValue , setTagValue] = useState ('');
const [catValue , setCatValue] = useState ('');


 

// show and hide the model in delete
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) =>
    {

      setrecipeId(id);
      setShow(true)
  };

// *********** URLS APIS ***************

const getAllRecipes = async (pageSize , pageNumber ,name , tagId ,categoryId) =>
{
  try
  {
    let response = await axiosInstance.get (
    `${RECIPES_URLS.GET_RECIPES}`,
    {params :{pageSize , pageNumber , name , tagId , categoryId}}
  );
  console.log(response.data.data)

  setArrayOfPages (Array (response.data.totalNumberOfPages).fill().map((_,i)=>i+1));
  setRecipesList (response.data.data);
  }

  catch(error)
  {
    console.log(error)
  }

}

  const getAllTages = async () => {
    try {
      const response = await axiosInstance.get(`${TAGS_URLS.GET_TAGS}`);
      settagesList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategories = async (pageSize, pageNumber) => {
    try {
      const response = await axiosInstance.get(`${CATEGORIES_URLS.GET_CATEGORIES}`, {
        params: { pageSize, pageNumber }
      });
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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

let addToFavs  = async (recipeId)=>
{

    try {
      let response = await axiosInstance.post(
        `${USER_FAVS_URL.CREATE_FAV}`, {recipeId:recipeId}
      );
      toast.success(response.data.message)
      navigate('/dashboard/favs')
    }

    catch(error)
    {
      console.log(error)
    }

}

  //**************** */ pagination***********************
  const getNameValue =(input)=>
  {
     setnameValue(input.target.value) // catch the value to sent to backend
     getAllRecipes(3,1,input.target.value,tagValue , catValue) // sent it  
  }

    const getTagValue =(input)=>
  {
     setTagValue(input.target.value) // catch the value to sent to backend
     getAllRecipes(3,1 , nameValue ,input.target.value , catValue) // sent it  
  }

    const getCatValue =(input)=>
  {
     setCatValue(input.target.value) // catch the value to sent to backend
     getAllRecipes(3,1, nameValue , tagValue ,input.target.value ) // sent it  
  }

// Use Effect 

useEffect ( ()=>{
  getAllRecipes(3,1)
   getAllTages();
    getAllCategories(100,1);
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
      {loginData?.userGroup !=='SystemUser'? 
        <button className='btn btn-custom-green' onClick={()=> navigate('/dashboard/recipe-data')}>
          Add New Item
        </button> :''}
        </div>


      {/* Table */}

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

  {/* Tag Dropdown */}
  <div className="col-md-3">
    <div className="form-group mb-3">
      
      <select className="form-control" onChange={getTagValue}>
        <option value="">Select Tag</option>
        {tagesList.map(tag => (
          <option key={tag.id} value={tag.id}>{tag.name}</option>
        ))}
      </select>
    </div>
  </div>

  {/* Category Dropdown */}
  <div className="col-md-3">
    <div className="form-group mb-3">
     
      <select className="form-control" onChange={getCatValue}>
        <option value="">Select Category</option>
        {CategoriesList.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
    </div>
  </div>

</div>



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

            

          <i class="fa fa-eye mx-3" aria-hidden="true"></i> 
          
          {loginData?.userGroup == 'SystemUser' ?
          <i onClick={()=>addToFavs(item.id)} class="fa fa-heart text-success" aria-hidden="true"></i>
           : ''}

          {loginData?.userGroup !='SystemUser'?
          <i className="fas fa-edit mx-2 text-warning"
               onClick={() => navigate('/dashboard/recipe-data', { state: { recipe: item } })}></i>:''}

            {loginData?.userGroup !='SystemUser'?   
          <i  onClick={()=> handleShow(item.id)} class="fa fa-trash text-danger" aria-hidden="true"></i> :''}
        </td> 
            </tr>

            ) : <NoData/> }
           
          </tbody>

        </table>


        
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    {arrayOfPages.map(pageNo => 
    <li onClick={()=>getAllRecipes(3,pageNo)} className="page-item">
      <a className="page-link" >{pageNo}</a>
    </li>)}        

    
    
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
      </div>
    </>
  )
}
  