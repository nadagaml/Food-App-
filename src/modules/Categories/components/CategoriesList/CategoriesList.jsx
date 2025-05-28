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

export default function CategoriesList() {
  const [CategoriesList, setCategoriesList] = useState([]);
  const [catId, setCatId] = useState(0);

 

  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCatId(id);
    setShow(true);
  };

  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);

  // states foe view model
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

  // Get All Categories
  const getAllCategories = async (pageSize, pageNumber) => {
    try {
      let response = await axiosInstance.get(`${CATEGORIES_URLS.GET_CATEGORIES}`, {
        params: { pageSize, pageNumber },
      });
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    getAllCategories(8, 1);
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
        <Modal show={showView} onHide={handleCloseView}>
          <Modal.Header closeButton>
            <Modal.Title>Category Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {viewCategory && (
              <div>
                <p><strong>Name:</strong> {viewCategory.name}</p>
                <p><strong>Created at:</strong> {viewCategory.creationDate}</p>
              
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
        <button className="btn btn-custom-green" onClick={() => handleShowAdd()}>
          Add New Category
        </button>
      </div>

      <div className="p-5">
        <table className="table table-striped">
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
                  <td>{item.creationDate}</td>
                  <td>
                   <i
  className="fa fa-eye text-success"
  onClick={() => handleShowView(item)}
  style={{ cursor: 'pointer' }}
></i>
                    <i
                      className="fas fa-edit mx-2 text-warning"
                      onClick={() => handleShowAdd(item)}
                      style={{ cursor: 'pointer' }}
                    ></i>
                    <i
                      onClick={() => handleShow(item.id)}
                      style={{ cursor: 'pointer' }}
                      className="fa fa-trash text-danger"
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
