import * as yup from 'yup';
export const registerSchema=yup.object({
    userName:yup.string().required("username is required").min(3,"must be at least 3 char").max(30,"must be 30 char max"),
    email:yup.string().email().required("email is required"),
    password:yup.string().required("password is required").min(3,"must be at least 3 char").max(30,"must be 30 char max")
})
