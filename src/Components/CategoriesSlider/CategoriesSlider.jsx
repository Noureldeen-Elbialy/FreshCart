import React from "react"
import Style from "./CategoriesSlider.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";


export default function CategoriesSlider() {

    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let { data } = useQuery('CategoriesSlider', getCategories);
    let categoriesSlider = data?.data.data;
    var settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        autoplay: true,
        cssEase: "linear",
        autoplaySpeed: 2000,
        slidesToShow: 7,
        slidesToScroll: 1,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return <>
        <div className="container my-5">
            <h3 className="h4">Shop Popular Categories</h3>
            <Slider {...settings}>
                {categoriesSlider?.map((category) =>
                    <div key={category._id} className="p-1">
                        <img height={200} className="w-100" src={category.image} alt={category.title} />
                        <p>{category.name}</p>
                    </div>

                )}
            </Slider>
        </div>
    </>
}