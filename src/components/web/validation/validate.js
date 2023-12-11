import * as yup from 'yup';
export const registerSchema=yup.object({
    userName:yup.string().required("username is required").min(3,"must be at least 3 char").max(30,"must be 30 char max"),
    email:yup.string().email().required("email is required"),
    password:yup.string().required("password is required").min(3,"must be at least 3 char").max(30,"must be 30 char max")
})
export const loginSchema=yup.object({
    email:yup.string().email().required("email is required"),
    password:yup.string().required("password is required").min(3,"must be at least 3 char").max(30,"must be 30 char max")
})

export const SendCodeSchema=yup.object({
    email:yup.string().email().required("email is required"),
})

export const ForgotPasswordSchema=yup.object({
    email:yup.string().email().required("email is required"),
    password:yup.string().required("password is required").min(3,"must be at least 3 char").max(30,"must be 30 char max"),
    code:yup.string().required("code is required").length(4,"must be 4")


})