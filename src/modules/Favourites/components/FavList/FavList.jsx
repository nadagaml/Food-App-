import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import imgCat from '../../../../assets/images/header.svg';
import { axiosInstance, baseImage, USER_FAVS_URL } from '../../../Services/urls';
import NoData from '../../../Shared/components/NoData/NoData';
import { toast } from 'react-toastify';

export default function FavList() {
  const [favList, setFavList] = useState([]);

  const getAllFavs = async () => {
    try {
      let response = await axiosInstance.get(USER_FAVS_URL.GET_FAVS);
      setFavList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFav = async (favId) => {
    try {
      await axiosInstance.delete(USER_FAVS_URL.DELETE_FAVS(favId));
      getAllFavs();
      toast.success("Favorite removed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFavs();
  }, []);

  return (
    <>
      <Header
        imgPath={imgCat}
        title="Favorite List"
        description="View and manage your favorite recipes here."
      />

      <div className="container py-4">
        <div className="row">
          {favList.length > 0 ? (
            favList.map((fav) => (
              <div key={fav.id} className="col-md-4 mb-4">
                <div className="card border-0 shadow-lg rounded-4 overflow-hidden position-relative">

                  
                  <i
                    onClick={() => deleteFav(fav.id)}
                    className="fa fa-heart position-absolute text-danger bg-white rounded-circle p-2 shadow"
                    style={{
                      top: '10px',
                      right: '10px',
                      cursor: 'pointer',
                      fontSize: '1.4rem',
                      zIndex: 10
                    }}
                  ></i>

                 
                  <img
                    src={`${baseImage}${fav.recipe.imagePath}`}
                    alt={fav.recipe.name}
                    className="img-fluid"
                    style={{
                      height: '220px',
                      objectFit: 'cover',
                      borderBottom: '1px solid #eee'
                    }}
                  />

                 
                  <div className="card-body bg-light text-center">
                    <h5 className="card-title text-success">{fav.recipe.name}</h5>
                    <p className="card-text text-muted small">{fav.recipe.description}</p>
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
  );
}
