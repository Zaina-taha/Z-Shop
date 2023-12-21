import React from 'react'
import Input from '../../pages/Input';
import axios  from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordSchema } from '../validation/validate';

export default function ForgotPassword() {
    const navigate=useNavigate();
    const initialValues = {
        email: '',
        password:''

    };
    const onSubmit = async users => {
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,users);

        if (data.message == "success") {
            toast.success('Password changed successfully', {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/login');
        }
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema:ForgotPasswordSchema,

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
        {
            type: 'code',
            id: 'code',
            title: 'user code',
            name: 'code',
            value: formik.values.code
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
    <h2>Forgot Password</h2>
    <form onSubmit={formik.handleSubmit}>
        {renderInputs}
        <button type='submit' disabled={!formik.isValid}>submit</button>
    </form>
</div>
  )
}
