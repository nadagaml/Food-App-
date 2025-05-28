import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { axiosInstance, CATEGORIES_URLS, RECIPES_URLS, TAGS_URLS } from '../../../Services/urls';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RecipesData() {
  const navigate = useNavigate();
  const location = useLocation();

  const editingRecipe = location.state?.recipe || null;
  const isEditMode = Boolean(editingRecipe);

  const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm();

  // Fill form if editing
  useEffect(() => {
    if (isEditMode) {
      setValue('name', editingRecipe.name);
      setValue('price', editingRecipe.price);
      setValue('description', editingRecipe.description);
      setValue('tagId', editingRecipe.tag?.id);
      setValue('categoriesIds', editingRecipe.category[0]?.id);
    }
  }, [editingRecipe, isEditMode, setValue]);

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("tagId", data.tagId);
    if (data.recipeImage?.[0]) {
      formData.append("recipeImage", data.recipeImage[0]);
    }
    return formData;
  };

  const onSubmit = async (data) => {
    let recipeData = appendToFormData(data);
    try {
      let response;
      if (isEditMode) {
        response = await axiosInstance.put(`${RECIPES_URLS.UPDATE_RECIPY(editingRecipe.id)}`, recipeData);
      } else {
        response = await axiosInstance.post(`${RECIPES_URLS.CREATE_RECIPY}`, recipeData);
      }
      toast.success(response.data.message);
      navigate('/dashboard/recipe');
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const [tagesList, settagesList] = useState([]);
  const [CategoriesList, setCategoriesList] = useState([]);

  const getAllTages = async () => {
    try {
      const response = await axiosInstance.get(`${TAGS_URLS.GET_TAGS}`);
      settagesList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategories = async (pageSize, pageNumber) => {
    try {
      const response = await axiosInstance.get(`${CATEGORIES_URLS.GET_CATEGORIES}`, {
        params: { pageSize, pageNumber }
      });
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTages();
    getAllCategories(10, 1);
  }, []);

  return (
    <>
      <div className="container recipe-header mt-5 p-5">
        <div className="row">
          <div className="col-md-8">
            <h5>{isEditMode ? "Edit Recipe" : "Fill the Recipes!"}</h5>
            <p>{isEditMode ? "You are editing an existing recipe." : "You can now fill the meals easily using the table and form."}</p>
          </div>
          <div className="col-md-4 d-flex justify-content-end align-items-center">
            <button onClick={() => navigate('/dashboard/recipe')} className='btn btn-custom-green'>
              All Recipes <i className="fa fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>

      <div className='w-75 m-auto p-5'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" className="form-control my-4" placeholder="Recipe Name"
            {...register('name', { required: 'Name is required !!!' })} />
          {errors.name && <span className="text-danger m-2">{errors.name.message}</span>}

          <select className="form-control my-4"
            {...register('tagId', { required: 'Tag is required !!!' })}>
            <option value="">Select Tag</option>
            {tagesList.map(tag => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
          {errors.tagId && <span className="text-danger m-2">{errors.tagId.message}</span>}

          <select className="form-control my-4"
            {...register('categoriesIds', { required: 'Category is required !!!' })}>
            <option value="">Select Category</option>
            {CategoriesList.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.categoriesIds && <span className="text-danger m-2">{errors.categoriesIds.message}</span>}

          <input type="text" className="form-control my-4" placeholder="Recipe Price"
            {...register('price', { required: 'Price is required !!!' })} />
          {errors.price && <span className="text-danger m-2">{errors.price.message}</span>}

          <textarea className="form-control my-4" placeholder="Recipe Description"
            {...register('description', { required: 'Description is required !!!' })}></textarea>
          {errors.description && <span className="text-danger m-2">{errors.description.message}</span>}

          <input className='form-control my-4' type='file'
            {...register('recipeImage', isEditMode ? {} : { required: 'Recipe image is required !!!' })} />
          {!isEditMode && errors.recipeImage && <span className="text-danger m-2">{errors.recipeImage.message}</span>}

          <div className='btns d-flex justify-content-end'>
            <button type="button" onClick={() => navigate('/dashboard/recipe')} className='btn btn-outline-success mx-3'>Cancel</button>
            <button type="submit" className='btn btn-custom-green'>{isEditMode ? "Update" : "Save"}</button>
          </div>
        </form>
      </div>
    </>
  );
}
