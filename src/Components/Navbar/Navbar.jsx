import React, { useContext } from "react"
import Style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import Wishes from "../Wishes/Wishes";

export default function Navbar() {
    let { userToken ,setUserToken} = useContext(UserContext);
    let navigate = useNavigate();
    function logOut() {
        localStorage.removeItem('userToken');
        setUserToken(null);
        navigate('/freshcart/login');
    }
    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/freshcart/"><img src={logo} alt="FreshCart" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {userToken !== null ? <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/freshcart">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/freshcart/cart">Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/freshcart/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/freshcart/categories">Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/freshcart/brands">Brands</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/freshcart/wishes">WishList<i className="fa-regular fa-heart mx-1"></i></Link>
                            </li>
                            
                        </>:''}
                        
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item d-flex align-items-center">
                            <i className="fab mx-2 fa-instagram"></i>
                            <i className="fab mx-2 fa-facebook"></i>
                            <i className="fab mx-2 fa-tiktok"></i>
                            <i className="fab mx-2 fa-twitter"></i>
                            <i className="fab mx-2 fa-linkedin"></i>
                            <i className="fab mx-2 fa-youtube"></i>
                        </li>
                        {userToken !== null ? <>
                            <li className="nav-item">
                                <span onClick={()=> {logOut()}} className="nav-link cursor-pointer">Logout</span>
                            </li>
                        </> :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="register">Register</Link>
                                </li>
                            </>}
                        
                        
                    </ul>
                </div>
            </div>
        </nav>
    </>
}