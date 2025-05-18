import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './modules/Shared/components/AuthLayout/AuthLayout';
import Login from './modules/Authentication/components/Login/Login';
import Register from './modules/Authentication/components/Register/Register';
import ResetPass from './modules/Authentication/components/Reset-pass/ResetPass';
import ForgetPass from './modules/Authentication/components/Forget-Pass/ForgetPass';
import VerifyAccount from './modules/Authentication/components/Verify-account/VerifyAccount';
import NotFound from './modules/Shared/components/NotFound/NotFound';
import MasterLayout from './modules/Shared/components/MasterLayout/MasterLayout';
import Dashboard from './modules/Dashboard/components/Dashboard/Dashboard';
import RecipesList from './modules/Recipes/components/RecipesList/RecipesList';
import RecipesData from './modules/Recipes/components/RecipesData/RecipesData';
import CategoriesList from './modules/Categories/components/CategoriesList/CategoriesList';
import CategoriesData from './modules/Categories/components/CategoriesData/CategoriesData';
import UserList from './modules/User/components/UserList/UserList';
import FavList from './modules/Favourites/components/FavList/FavList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './modules/Shared/components/ProtectedRoute/ProtectedRoute';


function App() {



  const [loginData, setLoginData] = useState('');

  let saveLoginData = ()=>{
    let encodedToken = localStorage.getItem('token');
    let decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken)
  }

  // logout function 
 
const routes = createBrowserRouter([

  { path :'', 
    element :<AuthLayout/>,
    errorElement:<NotFound/>,
    children :[

      {index:true, 
        element:<Login saveLoginData={saveLoginData}/> 
      },

       {path :'login' , 
        element:<Login saveLoginData={saveLoginData}/> 
      },

       {path :'register' , 
        element:<Register/> 
      },

       {path :'reset-pass' , 
        element:<ResetPass/> 
      },

      {path :'forget-pass' , 
        element:<ForgetPass/> 
      },

      {path :'verify-account' , 
        element:<VerifyAccount/> 
      },


    ],
    
  },


  {path: '/dashboard',
    element: <ProtectedRoute loginData={loginData}> <MasterLayout /> </ProtectedRoute>,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'recipe', element: <RecipesList /> },
      { path: 'recipe-data', element: <RecipesData /> },
      { path: 'category', element: <CategoriesList /> },
      { path: 'category-data', element: <CategoriesData /> },
      { path: 'users', element: <UserList /> },
      { path: 'favs', element: <FavList /> },

    ]
  }

])


  return (
    <>
      
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer position="top-right" autoClose={3000} />
     
    </>
  )
}

export default App
