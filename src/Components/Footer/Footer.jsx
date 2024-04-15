import React from "react"
import Style from "./Footer.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import amazon from "../../Assets/images/payment/amazon-pay.png";
import american from "../../Assets/images/payment/american-express.png";
import master from "../../Assets/images/payment/card.png";
import paypal from "../../Assets/images/payment/social.png";



export default function Footer() {

    let validationSchema = Yup.object({
        email: Yup.string().email('email is invaild').required('email is required')
    })
    function onSubmit(values) {
        console.log(values);
    }
    let formik = useFormik({
        initialValues: {
            email: ''
        }, validationSchema, onSubmit
    })
    return <>
        <footer className="bg-main-light p-5 position-relative">
            <div className="container">
                <h4>Get the FreshCart app</h4>
                <p className="text-muted">We will sendyou a link, open it on your phone to download the app.</p>
                <form className="ps-2" onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-10">
                            <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" autoComplete="off" id="email" className="form-control" placeholder="Email.." />
                            {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-1 mt-2">{formik.errors.email}</div> : null}
                        </div>
                        <div className="col-md-2">
                            <button type="submit" className="btn bg-main text-white w-100">Share App Link</button>

                        </div>
                    </div>

                </form>
                <hr className="text-muted" />
                <div className="d-flex align-items-center">
                    <h4>Payment Parteners</h4>
                    <ul className="list-unstyled h5 d-flex">
                        <li><img className="mx-2" width='35px' src={amazon} alt="amazon" /></li>
                        <li><img className="mx-2" width='35px' src={american} alt="american express" /></li>
                        <li><img className="mx-2" width='35px' src={master} alt="master card" /></li>
                        <li><img className="mx-2" width='35px' src={paypal} alt="paypal" /></li>
                    </ul>
                </div>
                <hr className="text-muted" />
            </div>

        </footer>
    </>
}