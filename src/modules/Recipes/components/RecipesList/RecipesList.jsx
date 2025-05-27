import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import RecipesImg from '../../../../assets/images/header.svg'
import {axiosInstance, baseImage, RECIPES_URLS} from '../../../Services/urls'
import NoData from '../../../Shared/components/NoData/NoData'
import { useNavigate } from 'react-router-dom'


export default function RecipesList() {

  let navigate = useNavigate()

// ********* USE State ******************

const [RecipesList , setRecipesList] =useState([])

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









// Use Effect 

useEffect ( ()=>{
  getAllRecipes(2,1)
}, [] )




  return (
    <>
    <Header imgPath={RecipesImg} title={'Recipes Items'} description={'You can now add your items that any user can order it from the Application and you can edit'}/>
    
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
            </tr>

            ) : <NoData/> }
           
          </tbody>

        </table>
      </div>
    </>
  )
}
  