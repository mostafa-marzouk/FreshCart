import React, { useState } from "react";
import style from "./ForgitPass.module.css";
import { Formik, useFormik } from "formik";
import axios from "axios";

export default function ForgitPass() {

    const [email, setemail] = useState(null)
    const [Isloding, setIsloding] = useState(false)
    function handleForgitPass(values) {
    setIsloding(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
        .then((res) => {
            console.log(res.data.message);
            setemail(res.data.message)
            setIsloding(false);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleForgitPass,
  });

  return (
    <>
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <div className="text-left my-10">
          <h1 className="text-[50px] text-emerald-600">Enter Your Email</h1>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="eamil"
            className="block py-5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 -emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        <button
          className="bg-emerald-600 float-left py-3 px-5 rounded-lg text-white"
          type="submit"
        >
                  {Isloding ?<i className="fas fa-spinner fa-spin"></i> : "Send" }
              </button>
              {email ? <div
          class="p-4 mb-4 text-sm mt-5 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <span className="font-medium ">{email}</span> 
        </div> : null}
      </form>
    </>
  );
}
