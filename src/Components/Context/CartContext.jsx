import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setcartId] = useState(0)
  const [CartNum, setCartNum] = useState(0)
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addProduct(ProductId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: ProductId },
        { headers: headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  
  function getCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        // console.log(res.data.numOfCartItems);
        setCartNum(res.data.numOfCartItems)
        setcartId(res.data.data._id)
        return res
      })
      .catch((err) => err);
  }

  function updateCountOfCart(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: count },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteItemCart(productId) {
    return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {headers}
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function CheckoutCart(cardId,url,FormData) {
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`,{shippingAddress :FormData},{headers})
      .then((res) => res)
      .catch((err) => err)
  }
  useEffect(() => {
    getCart()
},[])
  return (
    <CartContext.Provider value={{ addProduct, getCart, updateCountOfCart ,deleteItemCart,CheckoutCart,cartId,setCartNum,CartNum }}>
      {props.children}
    </CartContext.Provider>
  );
}
