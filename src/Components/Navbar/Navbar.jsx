import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  let { CartNum}= useContext(CartContext)
  let { token, settoken } = useContext(UserContext);
  let navigate = useNavigate();
  function signOut() {
    settoken(null);
    localStorage.removeItem("userToken");
    navigate("/Login");
  }

  return (
    <>
      <nav className="z-50 bg-slate-300 fixed top-0 left-0 right-0 border-gray-200 ">
        <div className="flex flex-wrap gap-5 justify-center lg:justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex gap-5 items-center">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo}
                className="h-8"
                width={"120px"}
                alt="Flowbite Logo"
              />
            </Link>
            {token != null ? (
              <ul className="flex gap-3">
                <li>
                  <Link className="text-slate-600" to="">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600 relative" to="cart">
                    <div className="absolute size-5 top-[-13px] rounded-full text-white left-[018px] text-[13px] flex justify-center items-center bg-emerald-600">{CartNum} </div>
                    Cart
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600 relative" to="wishlist">
                    {/* <div className="absolute size-5 top-[-13px] rounded-full text-white left-[018px] text-[13px] flex justify-center items-center bg-emerald-600">{CartNum} </div> */}
                    WishList
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600" to="products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600" to="categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="text-slate-600" to="brands">
                    Brands
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <ul className="flex gap-4">
              <li>
                <i className="fab fa-facebook"></i>
              </li>
              <li>
                <i className="fab fa-youtube"></i>
              </li>
              <li>
                <i className="fab fa-instagram"></i>
              </li>
              <li>
                <i className="fab fa-linkedin"></i>
              </li>
              <li>
                <i className="fab fa-twitter"></i>
              </li>
            </ul>
            <ul className="flex gap-3">
              {token != null ? (
                <li>
                  <span
                    onClick={() => {
                      signOut();
                    }}
                    className="cursor-pointer"
                  >
                    Signout
                  </span>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="login">Login</Link>
                  </li>
                  <li>
                    <Link to="register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
