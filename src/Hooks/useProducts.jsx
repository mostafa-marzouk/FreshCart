import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {
    function getProduct() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      }

      let ProductsInfo = useQuery({
        queryKey: ["recentProduct"],
        queryFn: getProduct,
        // refetchInterval : 2000 // refetching
        staleTime: 600000, // to make data fresh
        gcTime: 1000, // delet response after leve component
        // retry: 5 // try 5 if have problem
        // retryDelay: 1000 // time of try
        // refetchIntervalInBackground : true // refetch in back ground
        // refetchOnWindowFocus : true //refethcing in window focus
      });

return ProductsInfo;
}

