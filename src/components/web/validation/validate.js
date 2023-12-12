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
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const CreateOrderSchema=yup.object({
    
    couponName:yup.string(),
    address:yup.string().required("address is required"),
    phone:yup.string().required("phone number is required").matches(phoneRegExp, 'Phone number is not valid')


})