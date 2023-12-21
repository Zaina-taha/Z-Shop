import React from 'react'
import axios  from 'axios';
import Input from '../../pages/Input';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { SendCodeSchema } from '../validation/validate';



export default function SendCode() {
    const navigate=useNavigate();
    const initialValues = {
        email: '',

    };
    const onSubmit = async users => {
        const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,users);
        if (data.message == "success") {
            
            navigate('/forgotPassword');
        }


    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema:SendCodeSchema,


    });

    const inputs = [

        {
            type: 'email',
            id: 'email',
            title: 'user email',
            name: 'email',
            value: formik.values.email,
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
    <h2>Send Code</h2>
    <form onSubmit={formik.handleSubmit}>
        {renderInputs}
        <button type='submit' disabled={!formik.isValid}>Send Code</button>
    </form>
</div>
  )
}
