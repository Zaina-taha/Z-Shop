import React, { useContext } from 'react'
import { useFormik } from 'formik';
import { loginSchema} from './../validation/validate';
import { toast } from 'react-toastify';
import Input from './../../pages/Input';
import axios  from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { userContext } from '../context/User';



export default function Login() {
    const navigate=useNavigate();
    let{userToken,setUserToken}=useContext(userContext);
    if(userToken){
        navigate(-1);
    }
    const initialValues = {
        email: '',
        password:''

    };
    const onSubmit = async users => {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,users);
        console.log(data);
        if (data.message == "success") {
            localStorage.setItem("userToken",data.token);
            setUserToken(data.token);
            navigate('/');
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
                <Link to={'/forgotPassword'}>ForgotPassword</Link>
            </form>
        </div>
        
    )
}
