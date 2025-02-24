import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishContext = createContext();

export default function WishContextProvider(props) {

  let headers = {
    token: localStorage.getItem("userToken"),
  };
  const [WishList, setWishList] = useState([])

  function addWishProduct(ProductId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: ProductId },
        { headers: headers }
      )
      .then((res) => {
        // console.log(res);
        
        return res
      })

      .catch((err) => err);
  }
  
  function getCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => {
        setWishList(res.data.data)
        return res
      })
      .catch((err) => err);
  }

  function deletWishProduct(productId) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      )
      .then((res) => {
        // console.log(res);
      return res})
      .catch((err) => err);
  }


  useEffect(() => {
    getCart()
},[])
  return (
      <WishContext.Provider value={ {addWishProduct , getCart , deletWishProduct , WishList}}>
      {props.children}
    </WishContext.Provider>
  );
}
