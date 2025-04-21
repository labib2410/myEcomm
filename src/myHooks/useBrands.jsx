import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useBrands() {
    let responseObject=useQuery({
        queryKey:["brands"],
        queryFn:getBrands
        });
            function getBrands() {
                return axios.get('https://ecommerce.routemisr.com/api/v1/Brands');
            }
  return responseObject;
}
