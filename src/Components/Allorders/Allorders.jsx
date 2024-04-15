import React, { useContext, useEffect } from "react"
import Style from "./Allorders.module.css";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";

export default function Allorders() {
    function getAllOrders() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
    }
    let { data, isLoading } = useQuery('allOrders', getAllOrders);
    let allOrders = data?.data.data;
    console.log(allOrders);
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
                    </> :
                        <>
                            {allOrders?.map((order) => <div key={order.id} className="col-md-12">
                                <p className="fw-bold">Order Owner : {order.user.name}</p>
                                <p className="fw-bold">Owner Id : {order.user._id}</p>
                                <p className={order.isPaid === false ? "text-danger fw-bold" : "text-main fw-bold"}>isPaid : {order.isPaid === false ? "No" : "Yes"}</p>
                                <div className="row">
                                    {order.cartItems.map((items) => <div key={items._id} className="col-md-3 d-flex justify-content-start align-items-center">
                                        <div className="col-md-3">
                                            <img src={items.product.imageCover} className="w-100" alt={items.product.title} />
                                        </div>
                                        <div className="col-md-8 offset-md-1">
                                            <p className="m-0">{items.product.title.split(' ').slice(0, 3).join(' ')}</p>
                                            <p className="m-0 text-main">{items.product.brand.name}</p>
                                            <div className="details d-flex justify-content-between">
                                                <span>count : {items.count}</span>
                                                <span>price : {items.price}</span>
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                                <h3 className="fw-bold h5 mt-3"><span className="text-main">cart Price : </span> {order.totalOrderPrice} EGP</h3>
                                <hr />
                            </div>)}
                        </>}
                </div>
            </div>
        </section>
    </>
}