import React from "react"
import Style from "./Notfound.module.css";
import  g  from "../../Assets/images/notfound/13.svg";
export default function Notfound() {
    
    return <>
        <section className="container d-flex justify-content-center align-items-center" >
            <img src={g} className="w-75" alt="" />
        </section>
    </>
}