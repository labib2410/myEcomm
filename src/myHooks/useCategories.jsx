import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
export default function useCategories() {
    let responseObject = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    function getCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/Categories');

    }
    return responseObject;
}