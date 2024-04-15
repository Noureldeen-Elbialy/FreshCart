import React, { useContext, useEffect, useState } from "react"
import Style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Offline} from "react-detect-offline";


export default function Layout() {
    let { setUserToken } = useContext(UserContext);
    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            setUserToken(localStorage.getItem('userToken'))
        }
    },[])
    return <>
        <Navbar />
        <Outlet></Outlet>
        <div>
            <Offline>
                <div className="network-connection fw-bold">
                    <i className="fas fa-wifi me-2"></i>You are offline
                </div>
            </Offline>
        </div>
        <Footer/>
    </>
}