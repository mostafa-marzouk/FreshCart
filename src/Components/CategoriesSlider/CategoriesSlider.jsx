import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setcategories] = useState([]);
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setcategories(res.data.data);
      });
  }
  useEffect(() => {
    getCategories();
  }, []);
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <h2 className="text-left font-sans mb-2 text-gray-500 text-[20px]">
        Shop Popular Categories
      </h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id}>
            <img
              src={category.image}
              className="w-full h-[170px] object-cover"
              alt=""
            />
            <h4>{category.name}</h4>
          </div>
        ))}
      </Slider>
    </>
  );
}
