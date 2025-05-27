import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosInstance, CATEGORIES_URLS, RECIPES_URLS, TAGS_URLS } from '../../../Services/urls';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function RecipesData() {



  const appendToFormData = (data)=>{
    const formData = new FormData();
    formData.append("name" , data.name);
    formData.append("price" , data.price);
    formData.append("description" , data.description);
    formData.append("categoriesIds" , data.categoriesIds);
    formData.append("tagId" , data.tagId);
    formData.append("recipeImage" , data.recipeImage[0]);

    return formData;
    
  }

  let navigate = useNavigate()

  // Hook Form
  let {register , formState :{errors},handleSubmit } = useForm();

  let onSubmit = async (data) =>{
    let recipeData = appendToFormData(data);
    try {
    let response = await axiosInstance.post(`${RECIPES_URLS.CREATE_RECIPY}`, recipeData);
    console.log(response);
    toast.success(response.data.message);
    navigate('/dashboard/recipe')
    
  } catch (error) {
    console.log(error);
  }
  }

  /******** Use State -> For Making array *************/

 const [tagesList, settagesList] = useState([]);
 const [CategoriesList , setCategoriesList] =useState ([])
 

  

  // ******** APIS ***********

  // Get All Tages 
let getAllTages = async () => {
  try {
    let response = await axiosInstance.get(`${TAGS_URLS.GET_TAGS}`);
    console.log(response.data);
    settagesList(response.data);
  } catch (error) {
    console.log(error);
  }
};

 
  /// Get All Categories
const getAllCategories = async(pageSize , pageNumber)=>{
  try {
      let response = await axiosInstance.get (
        `${CATEGORIES_URLS.GET_CATEGORIES}`,
        {params : {pageSize , pageNumber}}
      );

      console.log(response.data.data);
      setCategoriesList(response.data.data)
  }
  catch (error) {
      console.log(error);
  }
}



  /**************  useEffect ->For Calling Data   *********/

  useEffect (()=>{
    getAllTages();
    getAllCategories()
  },[])








  return (
    <>
    
    <div className="container recipe-header mt-5 p-5">

    <div className="row">
      <div className="col-md-8 align-item-center">
       <div>
         <h5>Fill the Recipes !</h5>
        <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
       </div>
      </div>

      <div className="col-md-4 d-flex justify-content-end align-item-center">
        <button onClick={()=>navigate('/dashboard/recipe')} className='btn btn-custom-green'>
            All Recipes  <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>


    </div>
    


    {/* form */}
<div className='w-75 m-auto p-5'>
   <form onSubmit={handleSubmit(onSubmit)}>

  {/* Recipe Name */}
  <input
    type="text"
    className="form-control my-4"
    placeholder="Recipe Name"
    {...register('name', { required: 'Name is required !!!' })}
  />
  {errors.name && (
    <span className="text-danger m-2">{errors.name.message}</span>
  )}

  {/* Tag Dropdown */}
  <select
    className="form-control my-4"
    {...register('tagId', { required: 'Tag is required !!!' })}
  >
    <option value="">Select Tag</option>
    {tagesList.map(tag => (
      <option key={tag.id} value={tag.id}>{tag.name}</option>
    ))}
  </select>
  {errors.tagId && (
    <span className="text-danger m-2">{errors.tagId.message}</span>
  )}

  {/* Category Dropdown */}
  <select
    className="form-control my-4"
    {...register('categoriesIds', { required: 'Category is required !!!' })}
  >
    <option value="">Select Category</option>
    {CategoriesList.map(cat => (
      <option key={cat.id} value={cat.id}>{cat.name}</option>
    ))}
  </select>
  {errors.categoriesIds && (
    <span className="text-danger m-2">{errors.categoriesIds.message}</span>
  )}

  {/* Price */}
  <input
    type="text"
    className="form-control my-4"
    placeholder="Recipe Price"
    {...register('price', { required: 'Price is required !!!' })}
  />
  {errors.price && (
    <span className="text-danger m-2">{errors.price.message}</span>
  )}

  {/* Description */}
  <textarea
    className="form-control my-4"
    placeholder="Recipe Description"
    {...register('description', { required: 'Description is required !!!' })}
  ></textarea>
  {errors.description && (
    <span className="text-danger m-2">{errors.description.message}</span>
  )}

  {/* Recipe Image */}
  <input
    className='form-control my-4'
    type='file'
    {...register('recipeImage', { required: 'Recipe image is required !!!' })}
  />
  {errors.recipeImage && (
    <span className="text-danger m-2">{errors.recipeImage.message}</span>
  )}

  {/* Buttons */}
  <div className='btns d-flex justify-content-end'>
    <button onClick={()=>navigate('/dashboard/recipe')} type="button" className='btn btn-outline-success mx-3'>Cancel</button>
    <button type="submit" className='btn btn-custom-green'>Save</button>
  </div>

</form> 

</div>

    </>
  )
}
 