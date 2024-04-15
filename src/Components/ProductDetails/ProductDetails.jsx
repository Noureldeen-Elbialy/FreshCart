import React, { useContext } from "react"
import Style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
    let { addToCart } = useContext(CartContext);
    async function addProductToCart(id) {
        let response = await addToCart(id);
        if (response.data.status === "success") {
            toast(`Product added successfully`, {
                icon: '👏',
                style: {
                    borderRadius: '10px',
                    background: '#fff',
                    color: '#333',
                    border: 'solid 2px #0aad0a'
                },
            })
        } else {
            toast.error(`Error on adding`);
        }
    }
    let { id } = useParams();
    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    let { data } = useQuery('productDetails', () => getProductDetails(id))
    let productDetails = data?.data.data;
    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{ productDetails?.title }</title>
        </Helmet>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-3 my-5">
                    <img className="w-100" src={productDetails?.imageCover} alt={productDetails?.title} />
                </div>
                <div className="col-md-8 offset-md-1">
                    <h3 className="h4">{productDetails?.title}</h3>
                    <p className="text-muted ms-2">{productDetails?.description}</p>
                    <p className="text-main">{productDetails?.category.name}</p>
                    <div className="d-flex justify-content-between">
                        <span>{productDetails?.price} EGP</span>
                        <span><i className="fas fa-star rating-color"></i> {productDetails?.ratingsAverage}</span>
                    </div>
                    <button onClick={() => addProductToCart(id)} className="btn mt-2 bg-main text-white w-100">+ add to cart</button>
                </div>
            </div>
        </div>
    </>
}