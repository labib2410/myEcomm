import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";
import { Link } from 'react-router-dom';
import Spinner from "../spinner/spinner";
import useProducts from "../../myHooks/useProducts";
import toast from 'react-hot-toast';

export default function Products() {
    let { data, isLoading, isError, error } = useProducts();
    const { addItemToCart,setCart2 } = useContext(CartContext);
    let [btnLoad, setBtnLoad] = useState(false);
    let [productId, setProductId] = useState(0);

    async function addToCart(productId) {
        setBtnLoad(true);
        setProductId(productId);
        let res = await addItemToCart(productId);
        if (res.status === "success") {
            setCart2(res);
            toast.success("Item added to cart!");
            setBtnLoad(false);
        } else {
            toast.error("Failed to add item");
            setBtnLoad(false);
        }
    }

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return (
            <div className="text-center mt-5">
                <h3 className="text-danger">Error: {error}</h3>
            </div>
        );
    }
    return (
        <div className="container my-5">
            <div className="text-center mb-4">
                <h3 className="fs-2 text-danger fw-bolder">PRODUCTS TO SHOW</h3>
            </div>

            <div className="row gx-4 gy-4">
                {data?.data.data.map((product) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={product.id}>
                        <div className="product-card card shadow-sm h-100 border-0 rounded-3">
                            <Link
                                to={`/productdetails/${product.id}/${product.category.name}`}
                                className="text-decoration-none"
                            >
                                <img
                                    className="card-img-top rounded-3"
                                    alt={product.title}
                                    src={product.imageCover}
                                />
                                <div className="card-body p-3">
                                    <span className="d-block text-success card-title text-truncate">
                                        {product.title.split(' ').slice(0, 2).join(' ')}
                                    </span>
                                    <span className="d-block card-text text-secondary mb-3 text-truncate">
                                        {product.category.name}
                                    </span>
                                </div>
                                <div className="d-flex justify-content-between px-3 mb-3">
                                    <span className="text-success fs-5">
                                        {product.price} EGP
                                    </span>

                                    <span className="text-success fs-6">
                                        {product.ratingsAverage}
                                        <i className="fas fa-star text-warning"></i>
                                    </span>
                                </div>
                            </Link>

                            <div className="card-footer p-3">
                                <button
                                    className="btn btn-outline-success w-100"
                                    onClick={() => addToCart(product.id)}
                                    disabled={btnLoad && productId === product.id}
                                >
                                    {btnLoad && productId === product.id ? (
                                        <i className="fas fa-spinner fa-spin"></i>
                                    ) : (
                                        'Add To Cart'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}