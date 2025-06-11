import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import imgCat from '../../../../assets/images/header.svg';
import { axiosInstance, baseImage, USER_FAVS_URL } from '../../../Services/urls';
import NoData from '../../../Shared/components/NoData/NoData';
import { toast } from 'react-toastify';

export default function FavList() {

  // ********* USE State ******************
const [favList , setFavList] =useState([]);

   

// *********** URLS APIS ***************

const getAllFavs = async () =>
{
  try
  {
    let response = await axiosInstance.get (
    `${USER_FAVS_URL.GET_FAVS}`);
  console.log(response.data.data)
  setFavList (response.data.data);
  }

  catch(error)
  {
    console.log(error)
  }

}

const deleteFav =(favId)=>{

  try{
      let response = axiosInstance.delete(
        USER_FAVS_URL.DELETE_FAVS(favId)
      );
      getAllFavs();
      toast.success("Favs Deleted ");
      

  }
  catch(error)
  {
    console.log(error)
  }

}







// Use Effect 

useEffect ( ()=>{
  getAllFavs()
}, [] ) 












  return (
    <>
    
    <Header  
    imgPath={imgCat}
    title={"Fav List"}
    description={"You can now add your items that any user can order it from the Application and you can edit"}
    />

<div className="container">
  <div className="row">
    {favList.length > 0 ? (
      favList.map((fav) => (
        <div key={fav.id} className="col-md-4 mb-4">
          <div className="card position-relative shadow-sm border border-light rounded-4 p-3">
            {/* Heart icon */}
            <i
              onClick={() => deleteFav(fav.id)}
              className="fa fa-heart position-absolute text-danger"
              style={{ top: '10px', right: '10px', cursor: 'pointer', fontSize: '1.5rem' }}
              aria-hidden="true"
            ></i>

            {/* Recipe Image */}
            <img
              src={`${baseImage}${fav.recipe.imagePath}`}
              className="card-img-top rounded-5 "
              alt={fav.recipe.name}
              style={{
                height: '200px',
                objectFit: 'cover',
                padding: '4px',
                backgroundColor: '#fff'
              }}
            />

            {/* Card Body */}
            <div className="card-body px-2 py-3">
              <h5 className="card-title">{fav.recipe.name}</h5>
              <p className="card-text text-muted">{fav.recipe.description}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <NoData />
    )}
  </div>
</div>




    </>
  )
}
 