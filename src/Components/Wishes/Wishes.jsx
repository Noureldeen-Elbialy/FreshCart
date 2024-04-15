import React, { useContext, useEffect, useState } from "react"
import Style from "./Wishes.module.css";
import axios from "axios";
import { CartContext } from "../../Context/CartContext";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
export default function Wishes() {
    let { head } = useContext(CartContext);
    let [wishlist, setWishlist] = useState(null);

    async function getWishlist() {
        let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            { headers: head }).then((response) => response).catch((err) => err);
        console.log(response?.data?.data);
        setWishlist(response?.data?.data);
    }
    async function removeFromWishlist(productId) {
        let response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers:head
        }).then((response) => response).catch((err) => err);
        getWishlist();
        console.log(response.data?.data);
    }
    useEffect(() => {
        getWishlist();
    },[])
    return <>
        <section id="wishlist">
            <div className="container">
                <div className="row">
                    {
                        wishlist== null? <>
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
                        </> : <>
                                {wishlist.length === 0 ? <>
                                    <div className="vh-100 d-flex justify-content-center align-items-center">
                                        <h2>no items selected</h2>
                                    </div>
                                </> : <>
                                        {wishlist?.map((product) => <div key={product.id} className="col-12 my-3">
                                            <div className="row align-items-center">
                                                <div className="col-3  d-flex justify-content-center align-items-center">
                                                    <img src={product.imageCover} className="w-50" alt={product.title} />
                                                </div>
                                                <div className="col-7 offset-1">
                                                    <h3>{product.title}</h3>
                                                    <span>{product.category.name}</span>
                                                    <p>{product.price} EGP</p>
                                                </div>
                                                <div onClick={() => removeFromWishlist(product.id)} className="col-1 cursor-pointer">
                                                    <span className="text-danger">x</span>
                                                </div>
                                            </div>
                                        </div>)}
                                </>}
                            
                        </>
                    }
                    
                </div>
            </div>
        </section>
    </>
}


// let { head, removeWishProduct } = useContext(CartContext);
// async function removeItem(productId) {
//     let response = await removeWishProduct(productId);
//     console.log(response);
// }
// function getWishesProduct() {
//     return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: head })
//         .then((response) => response).catch((err) => err);
// }
// let { data, isLoading } = useQuery('wishesProduct', getWishesProduct);
// let wishList = data?.data.data;
// useEffect(() => {
//     getWishesProduct();
// }, [])
// console.log(data?.data.data);

// {/* <section id="wishes">
//             <div className="container">
//                 <h1 className="text-main text-center mt-2">Wishes</h1>
//                     {isLoading ? <>
//                         <div className="d-flex my-3 justify-content-center">
//                             <BallTriangle
//                                 height={100}
//                                 width={100}
//                                 radius={5}
//                                 color="#4fa94d"
//                                 ariaLabel="ball-triangle-loading"
//                                 wrapperStyle={{}}
//                                 wrapperClass=""
//                                 visible={true}
//                             />
//                         </div>
//                     </> : <>
//                         <div className="row gy-3 p-3">
//                             {wishList.length === 0 ? <>
//                                 <div className="vh-100 d-flex justify-content-center align-items-center">
//                                     <h4>there is no items</h4>
//                                 </div>
//                             </> : <>
//                                 {wishList?.map((product) => <div key={product.id} className="col-12 bg-main-light d-flex align-items-center">
//                                     <div className="col-2 d-flex justify-content-center align-items-center">
//                                         <img className="w-50 m-2" src={product.imageCover} alt={product.title} />
//                                     </div>
//                                     <div className="col-7 offset-1">
//                                         <h3 className="text-main">{product.title}</h3>
//                                         <span>{product.brand.name}</span>
//                                         <p className="h5 mt-3">{product.price} EGP</p>
//                                     </div>
//                                     <div className="col-1 d-flex justify-content-center align-items-center">
//                                         <span onClick={() => {
//                                             removeItem(product.id);
//                                         }} className="cursor-pointer text-danger">
//                                             x
//                                         </span>
//                                     </div>
//                                 </div>)}
//                             </>}
//                         </div>

//                     </>}

//                 </div>
//         </section> */}