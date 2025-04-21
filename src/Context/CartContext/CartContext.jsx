import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export default function CartContextProvider(props) {
    let userToken = localStorage.getItem('userToken');
    let [cart, setCart] = useState('');
    let [cart2, setCart2] = useState(null);
    function getLoggedUserCart() {
        return axios
            .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: userToken,
                },
            })
            .then((response) => response)
            .catch((error) => error)
    }
    function addItemToCart(productId) {
        return axios
            .post(
                "https://ecommerce.routemisr.com/api/v1/cart",
                { productId },
                {
                    headers: {
                        token: userToken,
                    },
                }
            )
            .then((response) => response.data) // نرجّع فقط البيانات المهمة
            .catch((error) => {
                error.data;
            });
    }
    function updateCartCount(productId, count) {
        return axios
            .put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count },
                {
                    headers: {
                        token: userToken,
                    },
                }
            )
            .then((response) => response.data)
            .catch((error) => {
                error.data;
            });
    }
    function deleteItemInCart(productId) {
        return axios
            .delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    headers: {
                        token: userToken,
                    },
                }
            )
            .then((response) => response.data)
            .catch((error) => {
                error.data;
            });
    }
    function clearCart() {
        return axios
            .delete(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers: {
                        token: userToken,
                    },
                }
            )
            .then((response) => response.data)
            .catch((error) => {
                error.data;
            });
    }
    function checkout(url, formValues) {

        return axios
            .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart}?url=${url}`, {
                shippingAddress: formValues
            }, {
                headers: {
                    token: userToken,
                },
            })
            .then((response) => response.data)
            .catch((error) => error.data)
    }

    function orders() {
        return axios
            .get(`https://ecommerce.routemisr.com/api/v1/orders`, {
                headers: {
                    token: userToken,
                },
            })
            .then((response) => response)
            .catch((error) => error)
    }
    async function getItems() {
        let res = await getLoggedUserCart();
        setCart2(res.data);
    }
    useEffect(() => {
        getItems();
    }, []);

    return <CartContext.Provider value={{ getLoggedUserCart, addItemToCart, updateCartCount, deleteItemInCart, clearCart, checkout, cart, setCart, orders,cart2,setCart2 }}>

        {props.children}

    </CartContext.Provider>
} 