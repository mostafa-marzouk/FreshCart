import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Login() {
  const [Error, setError] = useState("");
  const [IsLouding, setIsLouding] = useState(false);
  let { token, settoken } = useContext(UserContext);
  let navigate = useNavigate();
  function handleLogin(values) {
    setIsLouding(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        console.log(res);
        setIsLouding(false);
        if (res.data.message == "success") {
          console.log(res.data.token);
          localStorage.setItem("userToken", res.data.token);
          settoken(res.data.token)
          navigate("/");
        }
      })
      .catch((res) => {
        setIsLouding(false);
        console.log(res.response.data.message);
        setError(res.response.data.message);
      });
  }

  let myValidation = yup.object().shape({
    email: yup.string().email("email not valid").required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "passwors min length is 6"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: myValidation,
    onSubmit: handleLogin,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto ">
        {Error ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium"></span> {Error}
          </div>
        ) : null}
        <div className="mb-4 text-[30px] font-bold text-emerald-700  text-left">
          <h1>Login </h1>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 -emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-0  mt-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">Hint!</span> {formik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 -emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-0  mt-4 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              <span className="font-medium">Hint!</span>{" "}
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <div className=" flex gap-4  items-center">
          <button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {IsLouding ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
          <span>
            Dont you have an Account ?{" "}
            <Link to={"/register"}>
              <span className="text-blue-500 underline"> Register Now</span>
            </Link>{" "}
          </span>
        </div>
        <Link className="float-left mt-2" to={"/forgitpass"}>
              <span className="text-blue-500 underline"> Forgot Password</span>
            </Link>{" "}
      </form>
    </>
  );
}
