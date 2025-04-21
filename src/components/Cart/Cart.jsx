import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";
import Spinner from "../spinner/spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export default function Cart() {
    const { getLoggedUserCart, updateCartCount, deleteItemInCart, clearCart, setCart ,setCart2} = useContext(CartContext);
    const [cartItems, setCartItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [btnLoading2, setBtnLoading2] = useState(false);
    const [btnLoading3, setBtnLoading3] = useState(false);
    const [productId, setProductId] = useState(0);
    async function getCartItems() {
        let res = await getLoggedUserCart();
        setCartItems(res.data.data);
        setCart(res.data.data._id);
        setLoading(false);
    }
    async function updateCount(productId, count) {
        setBtnLoading(true);
        setProductId(productId);
        let res = await updateCartCount(productId, count);
        setCart(res);
        if (res.status === "success") {
            await getCartItems();
            toast.success("Done");
            setBtnLoading(false);

        } else {
            toast.error("Failed");
            setBtnLoading(false);
        }

    }
    async function deleteItem(productId) {
        setBtnLoading2(true);
        let res = await deleteItemInCart(productId);
        setCart(res);
        if (res.status === "success") {
            setCart2(res);
            await getCartItems();
            toast.success("Done");
            setBtnLoading2(false);
        } else {
            toast.error("Failed");
            setBtnLoading2(false);
        }

    }
    async function deleteCart() {
        setBtnLoading3(true);
        let res = await clearCart();
        setCart(res);
        if (res?.message === "success") {
            setCart2(res);
            await getCartItems();
            toast.success("cart deleted successfully");
            setBtnLoading3(false);

        } else {
            toast.error("can't delete cart");
            setBtnLoading3(false);
        }

    }

    useEffect(() => {
        getCartItems();
    }, []);
    if (loading) {
        return <Spinner />
    }
    return (
        <>
            <div className="container-fluid py-5">
                <h2 className="mb-1 text-center text-success fw-bold">🛒 Your Cart</h2>
                <h5 className="mb-4 text-center text-secondary fw-light">
                    Total Price: {cartItems?.totalCartPrice} EGP
                </h5>
                <div className="d-flex justify-content-center mb-3">
                    {cartItems?.products.length?(
                        <button
                        className="btn btn-outline-danger"
                        onClick={() => deleteCart()}
                        disabled={btnLoading3}
                    >
                        {btnLoading3 ? (
                            <i className="fas fa-spinner fa-spin"></i>
                        ) : (
                            <>
                                <i className="fas fa-trash-alt me-1"></i> Clear Cart
                            </>
                        )}
                    </button>

                    ):(
                        <span className="btn btn-sm btn-outline-danger col-md-12 disabled">
        <i className="fas fa-trash-alt me-1"></i> Clear Cart
    </span>
                    )}
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle text-center">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Title</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems?.products.map((product) => (
                                <tr key={product.product.id}>
                                    <td>
                                        <img
                                            src={product.product.imageCover}
                                            alt={product.product.title}
                                            className="img-fluid rounded"
                                            style={{ maxWidth: "60px", height: "auto" }}
                                        />
                                    </td>
                                    <td className="text-capitalize fw-medium small">
                                        {product.product.title.split(' ').slice(0, 2).join(' ')}
                                    </td>
                                    <td className="text-success fw-semibold small">
                                        {product.price} EGP
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-center flex-nowrap gap-1">
                                            <button
                                                className="btn btn-sm btn-outline-secondary px-2"
                                                onClick={() => updateCount(product.product.id, product.count - 1)}
                                                disabled={btnLoading && productId === product.product.id}
                                            >
                                                {btnLoading && productId === product.product.id ? (
                                                    <i className="fas fa-spinner fa-spin"></i>
                                                ) : (
                                                    <i className="fas fa-minus"></i>
                                                )}
                                            </button>

                                            <span className="fw-bold px-2 text-nowrap">{product.count}</span>

                                            <button
                                                className="btn btn-sm btn-outline-secondary px-2"
                                                onClick={() => updateCount(product.product.id, product.count + 1)}
                                                disabled={btnLoading && productId === product.product.id}
                                            >
                                                {btnLoading && productId === product.product.id ? (
                                                    <i className="fas fa-spinner fa-spin"></i>
                                                ) : (
                                                    <i className="fas fa-plus"></i>
                                                )}
                                            </button>

                                        </div>
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => deleteItem(product.product.id)}
                                            disabled={btnLoading2}
                                        >



                                            {btnLoading2 ? (
                                                <i className="fas fa-spinner fa-spin"></i>
                                            ) : (
                                                <>
                                                    <i className="fas fa-trash-alt me-1"></i> Remove
                                                </>
                                            )}
                                        </button>



                                    </td>
                                </tr>

                            ))}




                        </tbody>
                    </table>
                    {cartItems?.products.length ? (
    <Link className="btn btn-sm btn-outline-danger col-md-12" to='/checkout'>
        Checkout
    </Link>
) : (
    <span className="btn btn-sm btn-outline-danger col-md-12 disabled">
        Checkout
    </span>
)}

                </div>
            </div>
        </>
    );

}    