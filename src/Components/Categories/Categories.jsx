import React from "react"
import Style from "./Categories.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";

export default function Categories() {

    function getAllCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
    let { data , isLoading } = useQuery('AllCategories', getAllCategories);
    let categories = data?.data.data;
    console.log(categories);
    return <>
        <section>
            <div className="container py-3">
                <h2 className="text-main text-center">All Categories</h2>
                <div className="row g-3">
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
                        {categories?.map((category) => <div key={category._id} className="col-md-3">
                            <div className="category">
                                <img src={category.image} className="w-100" height={300} alt={category.name} />
                                <h3 className="h5 text-main">{category.name}</h3>
                            </div>
                        </div>)}
                    </>}
                </div>
            </div>
        </section>
    </>
}