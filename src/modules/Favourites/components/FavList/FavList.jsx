import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import imgCat from '../../../../assets/images/header.svg';

export default function FavList() {
  return (
    <>
    
    <Header  
    imgPath={imgCat}
    title={"Fav List"}
    description={"You can now add your items that any user can order it from the Application and you can edit"}
    />

    </>
  )
}
 