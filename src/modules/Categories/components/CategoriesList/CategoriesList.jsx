import React, { useEffect, useState } from 'react';
import Header from '../../../Shared/components/Header/Header';
import imgCat from '../../../../assets/images/header.svg';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NoData from '../../../Shared/components/NoData/NoData';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import { useForm } from 'react-hook-form';
import { axiosInstance, CATEGORIES_URLS } from '../../../Services/urls';
import { toast } from 'react-toastify';
import categoryimg from '../../../../assets/images/'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function CategoriesList() {

  // ********* USE State ******************
  const [CategoriesList, setCategoriesList] = useState([]);
  const [catId, setCatId] = useState(0);
  const [arrayOfPages , setArrayOfPages] = useState ([]);
  const [nameValue , setnameValue] = useState ('');
  const [loading, setLoading] = useState(false);

  

 

  // delete model
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCatId(id);
    setShow(true);
  };

  //Add Model
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);

  // states for view model
  const [showView , setshowView] = useState(false);
  const [viewCategory, setViewCategory] = useState(null);

  const handleCloseView = ()=>{
    setshowView (false)
    setViewCategory(null)
  }

  const handleShowView  = (category) =>
  {
    setViewCategory(category);
      setshowView(true);
  }

  // states for edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();



  const handleShowAdd = (category = null) => {
    if (category) {
      setIsEditMode(true);
      setEditingCategory(category);
      setValue('name', category.name);
    } else {
      setIsEditMode(false);
      setEditingCategory(null);
      reset();
    }
    setShowAdd(true);
  };


// *********** URLS APIS ***************

  // Get All Categories
  const getAllCategories = async (pageSize, pageNumber , name) => {
    setLoading(true);
  try {
    const response = await axiosInstance.get(`${CATEGORIES_URLS.GET_CATEGORIES}`, {
      params: { pageSize, pageNumber , name},
    });

    setArrayOfPages (Array (response.data.totalNumberOfPages).fill().map((_,i)=>i+1));
    setCategoriesList(response.data.data);
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoading(false); 
  }
};

  // Delete Category
  const deleteCategory = async () => {
    try {
      await axiosInstance.delete(CATEGORIES_URLS.DELETE_CATEGORY(catId));
      getAllCategories();
      handleClose();
      toast.success('Category Deleted');
    } catch (error) {
      console.log(error);
    }
  };

  // Add Category
  const addCategories = async (data) => {
    try {
      await axios.post('https://upskilling-egypt.com:3006/api/v1/Category/', data, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      getAllCategories();
      handleCloseAdd();
      toast.success('Category Added');
    } catch (error) {
      console.log(error);
      toast.error('Error adding category');
    }
  };

  // Update Category
  const updateCategory = async (data) => {
    try {
      await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Category/${editingCategory.id}`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      getAllCategories();
      handleCloseAdd();
      toast.success('Category Updated');
    } catch (error) {
      console.log(error);
      toast.error('Error updating category');
    }
  };



   //**************** */ pagination***********************
  const getNameValue =(input)=>
  {
     setnameValue(input.target.value) // catch the value to sent to backend
     getAllCategories(5,1,input.target.value) // sent it  
  }


// **************** Use Effect *********************
 useEffect(() => {
  getAllCategories(5, 1 ,"");
}, []);

  return (
    <>
      <Header
        imgPath={imgCat}
        title={'Categories Item'}
        description={
          'You can now add your items that any user can order it from the Application and you can edit'
        }
      />

      {/* Delete Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={'category'} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteCategory}>
            Delete
          </Button>
        </Modal.Footer>
      
      </Modal>

      {/* Add / Edit Modal */}
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(isEditMode ? updateCategory : addCategories)}>
            <input
              {...register('name', {
                required: 'Name is required !!!',
              })}
              type="text"
              className="form-control"
              placeholder="Category Name"
              aria-label="name"
            />
            {errors.name && (
              <p className="text-danger m-2">{errors.name.message}</p>
            )}
            <button className="btn btn-custom-green float-end mt-3" type="submit">
              {isEditMode ? 'Update' : 'Save'}
            </button>
          </form>
        </Modal.Body>
      </Modal>


      {/* View Modal */}
       <Modal show={showView} onHide={handleCloseView} centered>
  <Modal.Header closeButton>
    <Modal.Title>Category Details</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {viewCategory && (
      <div className="text-center">
        
        <img
          src=""
          alt="Category Icon"
          style={{ width: '80px', marginBottom: '15px' }}
        />

        {/* صندوق البيانات */}
        <div className="p-3 rounded border shadow-sm bg-light text-start">
          <p className="mb-2">
            <strong>Name:</strong> {viewCategory.name}
          </p>
          <p className="mb-0">
            <strong>Created At:</strong>{' '}
            {new Date(viewCategory.creationDate).toLocaleString()}
          </p>
        </div>
      </div>
    )}
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseView}>
      Close
    </Button>
  </Modal.Footer>
        </Modal>




            

      <div className="title d-flex justify-content-between p-4 align-items-center">
        <div className="titleCat">
          <h5>Categories Table Details</h5>
          <p>You can check all details</p>
        </div>
        <button className="btn btn-custom-green btn-add" onClick={() => handleShowAdd()}>
          Add New Category
        </button>
      </div>


      <div className="p-5">


      <input type='text' className='form-control mb-3 search-input' placeholder='Search By Name ....' onChange={getNameValue} />

{loading ? (
  <div className="text-center my-5">
    <div className="spinner-border text-success" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
) : (
        <table className="table table-striped table-custom">
          <thead>
            <tr>
              <th>Name</th>
              <th>Creation date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {CategoriesList.length > 0 ? (
              CategoriesList.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{new Date(item.creationDate).toLocaleString()}</td>
<td>
  <div className="dropdown text-center">
    <i
      className="fa fa-ellipsis-h fs-5"
      id={`dropdownMenuButton${item.id}`}
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{ color: '#198754', cursor: 'pointer' }}
    ></i>

    <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${item.id}`}>
      <li>
        <button
          className="dropdown-item text-primary d-flex align-items-center"
          onClick={() => handleShowView(item)}
        >
          <i className="fa fa-eye me-2"></i> View
        </button>
      </li>

      <li>
        <button
          className="dropdown-item text-warning d-flex align-items-center"
          onClick={() => handleShowAdd(item)}
        >
          <i className="fas fa-edit me-2"></i> Edit
        </button>
      </li>

      <li>
        <button
          className="dropdown-item text-danger d-flex align-items-center"
          onClick={() => handleShow(item.id)}
        >
          <i className="fa fa-trash me-2"></i> Delete
        </button>
      </li>
    </ul>
  </div>
</td>




                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
        )}


      {CategoriesList.length > 0 ?
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            {arrayOfPages.map(pageNo => 
            <li onClick={()=>getAllCategories(2,pageNo)} className="page-item">
              <a className="page-link" >{pageNo}</a>
            </li>)}        

            
            
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav> : ''}

      </div>
    </>
  );
}
