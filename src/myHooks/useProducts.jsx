import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useProducts() {
    let responseObject=useQuery({
        queryKey:["products"],
        queryFn:getProducts
        });
            function getProducts() {
                return axios.get('https://ecommerce.routemisr.com/api/v1/Products');
            }
  return responseObject;
}
