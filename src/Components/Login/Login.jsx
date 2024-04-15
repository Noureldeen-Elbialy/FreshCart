import React, { useContext, useState } from "react"
import Style from "./Login.module.css";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";


export default function Login() {
    let { setUserToken, setUserData }=useContext(UserContext)
    const passwordRegExp = /^[A-Z][a-z0-9]{6,15}$/;
    let navigate = useNavigate();

    let [error, setError] = useState(null);

    let [isLoading, setIsLoading] = useState(false);
    let userScheme = Yup.object({
        email: Yup.string().email('email is invalid').required('email is required'),

        password: Yup.string().matches(passwordRegExp, 'password start with capital char').required('password is required'),
    })

    async function loginSubmit(values) {
        setIsLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch(
            (err) => {
                setError(err.response.data.message)
                setIsLoading(false);
            }

        )
        if (data.message === "success") {
            setIsLoading(false);
            localStorage.setItem('userToken', data.token);
            setUserToken(data.token);
            navigate('/freshcart/');
        }
    }

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: userScheme
        ,
        onSubmit: loginSubmit
    })

    return <>
        <div className="w-75 m-auto my-5">
            <h2>Login Now</h2>

            <form onSubmit={formik.handleSubmit}>
                {error ? <div className="alert alert-danger">{error}</div> : ''}
                <label htmlFor="email">Email</label>
                <input id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" value={formik.values.email} autoComplete="off" type="email" />

                {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2 mt-2">{formik.errors.email}</div> : null}


                <label htmlFor="password">Password</label>
                <input id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control" value={formik.values.password} autoComplete="off" type="password" />

                {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2 mt-2">{formik.errors.password}</div> : null}

                {isLoading ? <button type="button" className="btn bg-main text-white mt-2">
                    <i className="fas fa-spinner fa-spin"></i>
                </button> : <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white mt-2">Login</button>}
            </form>
        </div>
    </>
}