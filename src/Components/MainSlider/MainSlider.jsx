import React from "react"
import Style from "./MainSlider.module.css";
import Slider from "react-slick";
import slider1 from "../../Assets/images/slider-image-3.jpeg";
import slider2 from "../../Assets/images/slider-image-2.jpeg";
// import slider3 from "../../Assets/images/slider-image-1.jpeg";
import  grocery1  from "../../Assets/images/grocery-banner.png";
import  grocery2  from "../../Assets/images/grocery-banner-2.jpeg";

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        arrows:false
    };
    return <>
        <div className="container mt-3">
            <div className="row g-0">
                <div className="col-md-9">
                    <Slider {...settings}>
                        <img height={400} className="w-100" src={slider1} alt="slide1" />
                        <img height={400} className="w-100" src={slider2} alt="slide2" />
                        {/* <img height={400} className="w-100" src={slider3} alt="slide3" /> */}
                    </Slider>
                </div>
                <div className="col-md-3">
                    <img height={200} className="w-100 rounded-0" src={grocery1} alt="grocery1" />
                    <img height={200} className="w-100 rounded-0" src={grocery2} alt="grocery2" />
                </div>
            </div>
        </div>
    </>
}