import React, { useContext } from 'react'
import { userContext } from './../context/User';
import { useFormik } from 'formik';
import Input from '../../pages/Input';
import { CreateReviewSchema } from '../validation/validate';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function Review() {
    const { productId } = useParams();
      const initialValues = {
        comment: '',
        rating:''

    };
      const onSubmit = async users => {
        const token=localStorage.getItem('userToken');
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,
        users,
        {headers:{Authorization:`Tariq__${token}`}});
        if (data.message == "success") {
            toast.success('Review created successfully', {
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

    };
      const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: CreateReviewSchema,
    });
      const inputs = [

        {
            type: 'text',
            id: 'comment',
            title: 'comment',
            name: 'comment',
            value: formik.values.comment,
        },
        {
            type: 'number',
            id: 'rating',
            title: 'rating',
            name: 'rating',
            value: formik.values.rating
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

      />)
  return (
    <div>
          <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
                {renderInputs}
                <button type='submit' disabled={!formik.isValid}>Submit</button>
            </form>
    </div>
  )
}
