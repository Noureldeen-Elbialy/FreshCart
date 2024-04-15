import React, { useContext } from "react"
import Style from "./CashOrder.module.css";
import { CartContext } from "../../Context/CartContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
export default function CashOrder() {
    let navigate = useNavigate();
    let { cashOrder, cartId } = useContext(CartContext);
    async function handelSubmit(values) {
        let response = await cashOrder(values, cartId);
        if (response.data.status === "success") {
            navigate('/freshcart/allorders')
        }
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
                    <input autoComplete="off" type="text" name="details" id="details" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} className="form-control mb-2" />

                    <label htmlFor="phone">phone :</label>
                    <input autoComplete="off" type="tel" name="phone" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className="form-control mb-2" />

                    <label htmlFor="city">city :</label>
                    <input autoComplete="off" type="tel" name="city" id="city" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} className="form-control mb-2" />

                    <button type="submit" className="btn bg-main text-white">submit</button>
                </form>
            </div>
        </section>
    </>
}