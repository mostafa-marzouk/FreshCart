import React from 'react'
import style from './ProductLogin.module.css'
import { Navigate } from 'react-router-dom'

export default function ProductLogin(props) {
   
    if(localStorage.getItem("userToken")){ 
        return <Navigate to={"/"}/>
    }  
    else {
        return props.children
    }

}
