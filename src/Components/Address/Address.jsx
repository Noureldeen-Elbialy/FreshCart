import React, { useContext } from "react"
import Style from "./Address.module.css";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";
export default function Address() {
    let { buyOnline ,cartId} = useContext(CartContext);

    async function handelSubmit(values) {
        let response = await buyOnline(values, cartId);
        window.location.href=response.data.session.url
    }
    let formik = useFormik({
        initialValues: {
            "details": "",
            "phone": "",
            "city": ""
        }, onSubmit: handelSubmit
    })

    return <>
        <section className="py-5">
            <div className="container">
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="details">details :</label>
                    <input autoComplete="off" className="form-control mb-2" type="details" name="details" id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                    <label htmlFor="phone">phone :</label>
                    <input autoComplete="off" className="form-control mb-2" type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                    <label htmlFor="city">city :</label>
                    <input autoComplete="off" className="form-control mb-2" type="city" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <button type="submit" className="btn bg-main text-white">Checkout</button>
                </form>
            </div>
        </section>
    </>
}