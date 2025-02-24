import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";

export default function Brands() {
  const [brands, setbrands] = useState([]);
  async function getBrands() {
    let response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    console.log(response.data.data);
    setbrands(response.data.data);
  }
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
      <div className="row  ">
        {brands.map((brand, index) => (
          <div className=" lg:w-1/4 md:w-1/3 p-3 w-1/2 border-spacing-2 rounded-lg">
            <div className=" cursor-pointer">
              <img
                src={brands[index].image}
                alt=""
                className="text-center w-full"
              />
              <h1 className="h-6 text-center">{brand.name}</h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
