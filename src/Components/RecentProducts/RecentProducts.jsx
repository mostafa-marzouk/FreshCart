import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../Context/WishContext";

export default function RecentProducts() {
  let {addWishProduct ,WishList } = useContext(WishContext)
  let { addProduct,setCartNum,CartNum } = useContext(CartContext);
  let { data, isError, error, isLoading } = useProducts();
  const [Loading, setLoading] = useState(false)
  const [CurrentID, setCurrentID] = useState(0)
//================================================
// statas for heart wish list
  const [IsHeart, setIsHeart] = useState(false)
  const [WishCheack , setWishCheack] = useState([])
  //================================================
  let test = WishList.map((item) => item.id)
  // setWishCheack(WishList.map((item) => item.id))
  // useEffect(() => {
  //   console.log("Ff");
    
  // },[test])

  async function addToCartProduct(ProductId) {
    setCartNum(CartNum + 1)
    setLoading(true)
    setCurrentID(ProductId)
    let response = await addProduct(ProductId);

    // console.log(response);
    if (response.data.status === "success") {
      setLoading(false)
      toast.success(response.data.message);
    } else {
      setLoading(false)
      toast.error(response.data.message);
    }
  }

  async function addToWishlist(idProduct) {
    setIsHeart(true)
    setCurrentID(idProduct)
    let response = await addWishProduct(idProduct)
    
    setWishCheack(await response.data.data)
    console.log( WishCheack);
    

    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    
}

  if (isLoading) {
    return (
      <div className="row justify-center   items-center min-h-lvh">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    );
  }
  if (isError) {
    return <h3>{error}</h3>;
  }

  return (
    <>
      <div className="row justify-center   items-center min-h-lvh ">
        {data?.data?.data.map((product,index) => (
          <div key={product.id} className="lg:w-1/6 md:w-1/3 w-1/2">
            <div className="product  rounded-lg  group ">
              <Link
                to={`productdetails/${product.id}/${product.category.name}`}
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
              {/* WishCheack && CurrentID == product.id ? "fa-regular text-emerald-600 fa-heart cursor-pointer":"fa-regular fa-heart cursor-pointer" */}
              <i onClick={()=>addToWishlist(product.id)} className={ test.includes(product.id) || WishCheack.includes(product.id) ? "fa-regular text-emerald-600 fa-heart cursor-pointer": "fa-regular fa-heart cursor-pointer"}></i>
              <button
                onClick={() => addToCartProduct(product.id) }
                className="bg-emerald-600 py-2 w-full px-4 transit8ion-all ease-in duration-200 rounded-lg group-hover:opacity-100 group-hover:translate-y-[0px] text-white my-3 opacity-0 translate-y-[100%]"
              >
                {Loading && CurrentID == product.id ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
