import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import Checkout from "../Checkout/Checkout";
import { Link } from "react-router-dom";

export default function Cart() {
  const [CartItems, setCartItems] = useState(null);
  let { getCart, updateCountOfCart, deleteItemCart, setCartNum, CartNum } =
    useContext(CartContext);

    
  async function getCartData() {
    let response = await getCart();
    setCartItems(response.data);
  }

  async function updateCount(productId, count) {
    let response = await updateCountOfCart(productId, count);

    if (response.data.status === "success") {
      toast.success("Product count updated successfully");
      setCartItems(response.data);
    } else {
      toast.error("Product count not updated");
    }
  }

  async function deleteItem(productId) {
    let response = await deleteItemCart(productId);
    console.log(response.data);
    if (response.data.status === "success") {
      setCartNum(CartNum - 1);
      setCartItems(response.data);
      toast.success("Product deleted successfully");
    } else {
      toast.error("Product not deleted");
    }
  }

  useEffect(() => {
    getCartData();
  }, []);
  return (
    <>
      {CartItems?.data?.products.length > 0 ? (
        <>
          <h2 className="capitalize text-emerald-600 font-bold my-4 py-4">
            total price : {CartItems?.data?.totalCartPrice} $
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
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
                {CartItems?.data?.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50 "
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 ">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateCount(product.product.id, product.count - 1)
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span> {product.count}</span>
                        </div>
                        <button
                          onClick={() =>
                            updateCount(product.product.id, product.count + 1)
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price * product.count} $
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteItem(product.product.id)}
                        className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to={"/checkout"}>
              <button className="bg-emerald-600 py-2 px-3 w-full my-2 rounded-lg text-white capitalize">
                check out
              </button>
            </Link>
          </div>
        </>
      ) : (
        <h1 className="text-red-600 capitalize text-[50px]">Cart is empty</h1>
      )}
    </>
  );
}
