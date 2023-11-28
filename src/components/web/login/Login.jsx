import React from 'react'
import { useFormik } from 'formik';
import { loginSchema} from './../validation/validate';
import { toast } from 'react-toastify';
import Input from './../../pages/Input';
import axios  from 'axios';
import {useNavigate} from 'react-router-dom';



export default function Login({saveCurrentUser}) {
    const navigate=useNavigate();
    
    const initialValues = {
        email: '',
        password:''

    };

    const onSubmit = async users => {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,users);
        console.log(data);
        if (data.message == 'succsess') {
           
            localStorage.setItem("userToken",data.token);
            saveCurrentUser();
            navigate('/home');
        }


    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: loginSchema,
    });


    const inputs = [

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
        

    ];
    const renderInputs = inputs.map((ele, index) =>
        <Input type={ele.type}
            id={ele.id}
            title={ele.title}
            name={ele.name}
            key={index}
            value={ele.value}
            errors={formik.errors}
            onChange={formik.handleChange}
            touched={formik.touched}
            onBlur={formik.handleBlur}

        />
    )
    return (
        <div className='mt-5 container'>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
                {renderInputs}
                <button type='submit' disabled={!formik.isValid}>Register</button>
            </form>
        </div>
    )
}
