import React from 'react'
import NoDataImage from '../../../../assets/images/NoData.png'

export default function NoData() {
  return (
    <>
    <div className='text-center'>
      <img src={NoDataImage}  alt='No data'/>
    <h4>No Data !</h4>
    </div>
    </>
  )
}
 