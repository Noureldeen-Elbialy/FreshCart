import React, { useContext, useEffect, useState } from "react"
import Style from "./FeatureProducts.module.css";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { QueryClient, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function FeatureProducts() {
    let { addToCart, head } = useContext(CartContext);
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
    function getFeatureProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }
    let { data, isLoading } = useQuery('FeaturedProducts', getFeatureProducts, {
        cacheTime: 30000
    });

    function addToWishlist(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            "productId": productId
        }, {
            headers: head
        }).then((response) => response).catch((err) => err);
    }
    async function addWish(id) {
        let response = await addToWishlist(id);
        if (response.data?.status === "success") {
            toast(`Product added To Wish`, {
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
    return <>
        <section className="py-5">
            <div className="container">
                <div className="row">
                    {isLoading ? <>
                        <div className="d-flex justify-content-center">
                            <BallTriangle
                                height={100}
                                width={100}
                                radius={5}
                                color="#4fa94d"
                                ariaLabel="ball-triangle-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>

                    </> : <>{data?.data.data.map((product) =>
                        <div key={product.id} className="col-md-2">
                            <div className="product overflow-hidden p-3 h-100 rounded-2 position-relative">
                                <div onClick={() => { addWish(product.id) }} className='position-absolute love-btn top-0 end-0 m-1 fs-4'>
                                    <i className="fa-regular fa-heart"></i>
                                </div>
                                <Link to={`/freshcart/productdetails/${product.id}`}>
                                    <img src={product.imageCover} className="w-100" alt={product.title} />
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <p className="text-main mb-0">{product.category.name}</p>
                                        <p className="text-white mb-0 badge bg-main opacity-50 d-flex justify-content-center align-items-center">{product.brand.name}</p>
                                    </div>
                                    <h3 className="h5">{product.title.split(' ').slice(0, 3).join(' ')}</h3>
                                    <div className="d-flex justify-content-between">
                                        <p>{product.price + ' EGP'}</p>
                                        <p><i className="fas fa-star rating-color"></i>{product.ratingsAverage}</p>
                                    </div>
                                </Link>
                                <button onClick={() => addProductToCart(product.id)} className="btn bg-main text-white w-100"><i className=" fa-solid fa-cart-plus"></i> Add To Cart</button>
                            </div>

                        </div>)}</>}

                </div>
            </div>
        </section>
    </>
}