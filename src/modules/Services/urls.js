import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3006/api/v1";
export const baseImage = "https://upskilling-egypt.com:3006/";

export const axiosInstance = axios.create({
    baseURL , 
    headers:{Authorization:localStorage.getItem('token')}
});


// ****************** USERS Auth **********************
export const USERS_URLS = {
    LOGIN : `/Users/Login` , 
    FORGET_PASS : `/Users/Reset/Request` ,
    RESET_PASS : `/Users/Reset`
};

// **************** CATEGORIES **************

export const CATEGORIES_URLS = {
    GET_CATEGORIES : `/Category/`,
    DELETE_CATEGORY : (id)=> `/Category/${id}`,
    
};

// ************** RECIPES *************

export const RECIPES_URLS = {
    GET_RECIPES : `/Recipe/` ,
    CREATE_RECIPY :`/Recipe/` , 
    DELETE_RECIPY : (id)=>`/Recipe/${id}` ,
    UPDATE_RECIPY : (id)=>`/Recipe/${id}`,
 
}


// ************** TAGS URLS *************

export const TAGS_URLS = {
    GET_TAGS : `/tag/` ,
}


// ****************** USERS LIST **********************

// export const UsersLIST = {
//     GET_USERS = ``, 
// }

// ****************** USERS LIST **********************
export const USER_FAVS_URL = {
    GET_FAVS : `/userRecipe/`,
    CREATE_FAV : `/userRecipe/`,
    DELETE_FAVS :(id)=> `/userRecipe/${id}`

}