import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import HeaderImg from '../../../../assets/images/eating vegan food-rafiki.png'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  
const navigate = useNavigate();

  return (
    <>
    
    <Header imgPath={HeaderImg} title={'Welcome'} description={'This is a welcoming screen for the entry of the application , you can now see the options'}/>


    <div className="container recipe-header mt-5 p-5">
        <div className="row">
          <div className="col-md-8">
            <h5>Fill the <span className='text-success'>Recipes</span>!</h5>
            <p>You can now fill the meals easily using the table and form.</p>
          </div>
          <div className="col-md-4 d-flex justify-content-end align-items-center">
            <button onClick={() => navigate('/dashboard/recipe')} className='btn btn-custom-green'>
              All Recipes <i className="fa fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
 