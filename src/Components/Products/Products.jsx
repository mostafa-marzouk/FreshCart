import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../Hooks/useProducts";

export default function RecentProducts() {
  
  
  let { data, isError,error, isLoading } = useProducts();
  
  

  if (isLoading) {
    return <div className="row justify-center   items-center min-h-lvh">
          <div className="sk-chase">
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    <div className="sk-chase-dot"></div>
    </div>
    </div>

  }
  if (isError) {
    return <h3>{error}</h3>
  }

  return (
    <>
      <div className="row justify-center   items-center min-h-lvh ">
        {data?.data?.data.map((product) => (
          <div key={product.id} className="lg:w-1/6 md:w-1/3 w-1/2">
            <div className="product  rounded-lg  group ">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img src={product.imageCover} alt="d" />
                <h3 className=" text-emerald-600">{product.category.name} </h3>
                <h3 className="font-semibold mb-3">
                  {product.title.split(" ").slice(0, 2).join(" ")}{" "}
                </h3>
                <div className="flex justify-between p-3">
                  <span>{product.price} EGP</span>
                  <span>
                    {" "}
                    <i className="fas fa-star   text-yellow-400"></i>{" "}
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button className="bg-emerald-600 py-2 w-full px-4 transit8ion-all ease-in duration-200 rounded-lg group-hover:opacity-100 group-hover:translate-y-[0px] text-white my-3 opacity-0 translate-y-[100%]">
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
