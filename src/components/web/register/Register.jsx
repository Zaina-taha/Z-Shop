import React from 'react'
import { useFormik } from 'formik';
import { registerSchema } from './../validation/validate';
import { toast } from 'react-toastify';
import Input from './../../pages/Input';
import axios  from 'axios';



export default function Register() {
    const initialValues = {
        userName: '',
        email: '',
        password: '',
        image:null
    };
    const handleFieledChange = (event) => {
        formik.setFieldValue('image', event.target.files[0]);
        console.log(event);
    }
    const onSubmit = async users => {
        const formData = new FormData();
        formData.append("username", users.userName);
        formData.append("email", users.email);
        formData.append("password", users.password);
        formData.append("image", users.image);
        

        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,formData);
        console.log(data);
        if (data && data.message == 'succsess') {
            formik.resetForm();
            toast.success('account created successfuly ,please confirm your email', {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        console.log(data);


    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: registerSchema,
    });


    const inputs = [
        {
            type: 'text',
            id: 'username',
            title: 'user name',
            name: 'userName',
            value: formik.values.userName,
        },
        {
            type: 'email',
            id: 'email',
            title: 'user email',
            name: 'email',
            value: formik.values.email,
        },
        {
            type: 'password',
            id: 'password',
            title: 'user password',
            name: 'password',
            value: formik.values.password
        },
        {
            type: 'file',
            id: 'image',
            title: 'user image',
            name: 'image',
            onChange: handleFieledChange
        },
    ];
    const renderInputs = inputs.map((ele, index) =>
        <Input type={ele.type}
            id={ele.id}
            title={ele.title}
            name={ele.name}
            key={index}
            value={ele.value}
            errors={formik.errors}
            onChange={ele.onChange || formik.handleChange}
            touched={formik.touched}
            onBlur={formik.handleBlur}

        />
    )
    return (
        <div className='mt-5 container'>
            <h2>Create account</h2>
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                {renderInputs}
                <button type='submit' disabled={!formik.isValid}>Register</button>
            </form>
        </div>
    )
}
