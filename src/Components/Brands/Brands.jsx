import React from "react"
import Style from "./Brands.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";

export default function Brands() {
    function getAllBrands() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    }
    let { data ,isLoading} = useQuery("Brands", getAllBrands);
    let allBrands = data?.data.data;
    console.log(allBrands);
    return <>
        <section id="allBrands py-3">
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
                    </> : <>
                            {allBrands?.map((brand) => <div key={brand._id} className="col-md-3">
                                <div className="brand text-center">
                                    <img src={brand.image} className="w-100" alt="" />
                                    <p>{brand.name }</p>
                                </div>
                            </div>)}
                    </>}
                </div>
            </div>
        </section>
    </>
}