import React, { useContext } from "react"
import Style from "./Home.module.css";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
export default function Home() {
    return <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Fresh Cart</title>
        </Helmet>
        <MainSlider/>
        <CategoriesSlider/>
        <FeatureProducts />
    </>
}