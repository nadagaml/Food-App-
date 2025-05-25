export const EMAIL_VALIDATION = {
    require:'Email is required' , 
    pattern:{
        value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message : "Email not valid , Please enter valid email"
    },
}