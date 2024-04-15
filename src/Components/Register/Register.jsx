import React, { useState } from "react"
import Style from "./Register.module.css";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const passwordRegExp = /^[A-Z][a-z0-9]{6,15}$/;
    let navigate = useNavigate();

    let [error, setError] = useState(null);

    let [isLoading, setIsLoading] = useState(false);
    let userScheme = Yup.object({
        name: Yup.string().min(3, 'minimum length should be 3').max(15, 'max length should be 15').required('name is required'),

        email: Yup.string().email('email is invalid').required('email is required'),

        phone: Yup.string().matches(phoneRegExp, 'phone is invalid').required('phone is required'),

        password: Yup.string().matches(passwordRegExp, 'password start with capital char').required('password is required'),

        rePassword: Yup.string().oneOf([Yup.ref('password')], 'password notmatched')


    })

    async function submitRegister(values) {
        setIsLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values).catch(
            (err) => {
                setError(err.response.data.errors.msg)
                setIsLoading(false);

            }

        )
        if (data.message === "success") {
            setIsLoading(false);
            navigate('/login');
        }
    }

    let formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            rePassword: ''
        },
        validationSchema: userScheme
        ,
        onSubmit: submitRegister
    })

    return <>
        <div className="w-75 m-auto my-5">
            <h2>Register Now</h2>

            <form onSubmit={formik.handleSubmit}>
                {error ? <div className="alert alert-danger">{error}</div>:''}
                
                <label htmlFor="name">Name</label>
                <input id="name" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" value={formik.values.name} autoComplete="off" type="text" />

                {formik.errors.name && formik.touched.name ? <div className="alert alert-danger py-2 mt-2">{formik.errors.name}</div> : null}

                <label htmlFor="email">Email</label>
                <input id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" value={formik.values.email} autoComplete="off" type="email" />

                {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2 mt-2">{formik.errors.email}</div> : null}

                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" value={formik.values.phone} autoComplete="off" type="tel" />

                {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger py-2 mt-2">{formik.errors.phone}</div> : null}

                <label htmlFor="password">Password</label>
                <input id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" value={formik.values.password} autoComplete="off" type="password" />

                {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2 mt-2">{formik.errors.password}</div> : null}

                <label htmlFor="rePassword">Repassword</label>
                <input id="rePassword" name="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" value={formik.values.rePassword} autoComplete="off" type="password" />

                {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger py-2 mt-2">{formik.errors.rePassword}</div> : null}

                {isLoading ? <button type="button" className="btn bg-main text-white mt-2">
                    <i className="fas fa-spinner fa-spin"></i>
                </button> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white mt-2">Register</button>}
                

                
            </form>
        </div>
    </>
}