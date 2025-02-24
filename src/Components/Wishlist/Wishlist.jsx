import React, { useContext, useEffect, useState } from "react";
import style from "./Wishlist.module.css";
import { use } from "react";
import { WishContext } from "../Context/WishContext";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";

export default function Wishlist() {
  let { deletWishProduct, getCart } = useContext(WishContext);
  let { addProduct, setCartNum, CartNum } = useContext(CartContext);
  const [CurrentID, setCurrentID] = useState(0)
  const [WishItems, setWishItems] = useState([]);
  const [NewLength, setNewLength] = useState([]);


  async function getWishlist() {
    let response = await getCart();
    // console.log(response.data.data);
    setWishItems(response.data.data);
  }


  const deleteItem = async (productId) => {
    let response = await deletWishProduct(productId);
    console.log(response.data);
    if (response.data.status === "success") {
      console.log(response.data);
      setNewLength(response.data.data);
      toast.success("Product deleted successfully");
    }
  };


  async function addToCartProduct(ProductId) {
    setCartNum(CartNum + 1)
    
    setCurrentID(ProductId)
    let response = await addProduct(ProductId);

    // console.log(response);
    if (response.data.status === "success") {
      
      toast.success(response.data.message);
    } else {
      
      toast.error(response.data.message);
    }
  }


  useEffect(() => {
    getWishlist();
  }, [NewLength]);

  return (
    <>
      {WishItems.length > 0 ? WishItems.map((item, index) => (
        <div
          key={index}
          className="relative overflow-x-auto shadow-md sm:rounded-lg"
        >
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 ">
                <td className="p-4 w-[50px]">
                  <img
                    src={item.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt="product"
                  />
                </td>
                <td className="w-[30%] px-6 py-4 font-semibold text-gray-900 ">
                  {item.title}
                </td>

                <td className="px-6 py-4 font-semibold text-gray-900 ">
                  {item.price} $
                </td>
                <td className="px-6 py-4 flex flex-col items-start">
                  <button
                    onClick={() => addToCartProduct(item.id) }
                    className="bg-emerald-600 py-2  px-4  rounded-lg text-white my-3"
                  >
                    add to cart
                    {/* {Loading && CurrentID == product.id ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add to Cart"} */}
                  </button>
                  <span
                    onClick={() => deleteItem(item.id)}
                    className="font-medium text-red-600  cursor-pointer"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )): <h1 className={style.empty}>Your Wishlist is Empty</h1>}
    </>
  );
}
