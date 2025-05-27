import axios from "axios";

const baseURL = "https://upskilling-egypt.com:3006/api/v1";
export const baseImage = "https://upskilling-egypt.com:3006/";

export const axiosInstance = axios.create({
    baseURL , 
    headers:{Authorization:localStorage.getItem('token')}
});


// ****************** USERS **********************
export const USERS_URLS = {
    LOGIN : `/Users/Login` , 
    FORGET_PASS : `/Users/Reset/Request` ,
    RESET_PASS : `/Users/Reset`
};

// **************** CATEGORIES **************

export const CATEGORIES_URLS = {
    GET_CATEGORIES : `/Category/`,
    DELETE_CATEGORY : (id)=> `/Category/${id}`
};

// ************** RECIPES *************

export const RECIPES_URLS = {
    GET_RECIPES : `/Recipe/` ,
    CREATE_RECIPY :`/Recipe/` , 
    DELETE_RECIPY : (id)=>`/Recipe/${id}`
}


// ************** TAGS URLS *************

export const TAGS_URLS = {
    GET_TAGS : `/tag/` ,
}

