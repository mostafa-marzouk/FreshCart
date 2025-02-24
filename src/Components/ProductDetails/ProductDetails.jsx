import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

export default function ProductDetails() {
  let { id, category } = useParams();
  const [product, setproduct] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState([])
  function getProdect(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        setproduct(res.data.data);
      })
      .catch((res) => {
        console.log(res.data.data);
      });
  }

  function getAllCategory() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
      let related = res.data.data.filter((product)=> product.category.name == category)
      setrelatedProducts(related)
      
    }).catch((res) => {
      console.log(res);
      
    });
  }
  useEffect(() => {
    getProdect(id);
    getAllCategory()
  }, [id, category]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,

  };
  return (
    <>
      
      <div className="row items-center">
        <div className="w-1/4">
          <Slider {...settings}>
            {product?.images.map((src ,i) => <img src={src } key={i} className="w-full" />)}
            
        </Slider>
        </div>
        <div className="w-3/4 p-4 text-left">
          <h3 className="font-semibold capitalize text-2xl">
            {product?.title}
          </h3>
          <h4 className="text-gray-500 my-4">{product?.description}</h4>
          <h4>{product?.category.name}</h4>
          <div className="flex justify-between p-3">
            <span className="font-bold">{product?.price} EGP</span>
            <span>
              {" "}
              <i className="fas fa-star   text-yellow-400"></i>{" "}
              {product?.ratingsAverage}
            </span>
          </div>
          <button className="bg-emerald-600 py-2 w-full px-4 rounded-lg  text-white my-3 ">
            Add To Cart
          </button>
        </div>
      </div>
      <div className="row justify-center gap-1 items-center min-h-lvh ">
        { relatedProducts.length > 0 ? relatedProducts.map((product) => (
            <div key={product.id} className="lg:w-1/6 md:w-1/3 w-1/2">
                <div className="product  rounded-lg  group ">
                    <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                    <img src={product.imageCover} alt="d" />
                    <h3 className=" text-emerald-600">{ product.category.name } </h3>
                    <h3 className="font-semibold mb-3">{product.title.split(" ").slice(0,2).join(" ")} </h3>
                    <div className="flex justify-between p-3">
                        <span>{product.price} EGP</span>
                        <span> <i className="fas fa-star   text-yellow-400"></i> {product.ratingsAverage}</span>
                    </div>
   
                    </Link>
                    <button className="bg-emerald-600 py-2 w-full px-4 transit8ion-all ease-in duration-200 rounded-lg group-hover:opacity-100 group-hover:translate-y-[0px] text-white my-3 opacity-0 translate-y-[100%]">Add To Cart</button>
                </div>
          </div>
        )) : <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>}
      </div>
    </>
  );
}
