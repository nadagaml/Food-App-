import React from 'react'
import NoDataImage from '../../../../assets/images/NoData.png'

export default function DeleteConfirmation({deleteItem}) {
  return (
    <>
        <div className="text-center">
          
      <img src={NoDataImage} alt='Delete'  />
      <h6 className='my-3'>Delete this {deleteItem} ? </h6>
      <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </div>

    </>
  )
}
