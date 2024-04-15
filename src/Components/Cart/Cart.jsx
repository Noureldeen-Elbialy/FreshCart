import React, { useContext, useEffect, useState } from "react"
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Cart() {
    let { getLoggedUserCart, removeSpecificCartItems, updateCount, getCartId} = useContext(CartContext);
    let [cartDetails, setCartDetails] = useState(null);

    useEffect(() => {
        getCartId();
    }, []);
    async function displayCart() {
        let { data } = await getLoggedUserCart();
        setCartDetails(data);
        console.log(data);
    }

    async function deleteCartItem(id) {
        let { data } = await removeSpecificCartItems(id);
        setCartDetails(data);
    }

    async function changeCount(id, count) {
        let { data } = await updateCount(id, count);
        setCartDetails(data);
    }

    useEffect(() => {
        displayCart();
    }, [])



    return <>
        <div className="container bg-main-light my-2 py-2" >
            <h2 className="h4">Shop Cart :</h2>
            {cartDetails ? <>
                <h3 className="h5 text-main">Total Cart items : {cartDetails.numOfCartItems}</h3>
                {cartDetails.data.products.map((product) => <div key={product.product.id} className="row my-3">
                    <div className="col-md-1">
                        <img src={product.product.imageCover} className="w-100" alt="" />
                    </div>
                    <div className="col-md-11 d-flex justify-content-between align-items-center">
                        <div>
                            <h3 className="h6">{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                            <h4 className="h6 text-main">Price : {product.price} EGP</h4>
                            <button onClick={() => deleteCartItem(product.product.id)} className="btn border-0"><i className="fas fa-trash-can text-danger font-sm"></i> Remove</button>
                        </div>
                        <div>
                            <button onClick={() => changeCount(product.product.id, product.count + 1)} className="btn brdr-btn">+</button>
                            <span className="mx-2">{product.count}</span>
                            <button onClick={() => changeCount(product.product.id, product.count - 1)} className="btn brdr-btn">-</button>
                        </div>
                    </div>
                </div>)}
                <h3 className="h5 text-main">Total Cart Price : {cartDetails.data.totalCartPrice} EGP</h3>
                <div className=" d-flex justify-content-evenly mt-3">
                    <Link  to={'/address'} className="btn bg-main text-white w-25">Buy Online</Link>
                    <Link  to={'/cashorder'} className="btn bg-main text-white w-25">Cash Order</Link>
                </div>
            </> : <div className="d-flex justify-content-center">
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
            }
        </div>
    </>
}