import Spinner from "../spinner/spinner";
import useProducts from "../../myHooks/useProducts";
import { Link } from "react-router-dom";

export default function RecentProducts() {
    let { data, isLoading, isError, error } = useProducts();
    if (isError) {
        return <div>{error}</div>; // Display the error message if there's an issue
    }
    if (isLoading) {
        return <Spinner />; // Show a spinner while loading
    }
    return (
        <div className='container'>
            <div className='d-flex justify-content-center align-items-center'>
                <h3 className='fs-2 text-danger fw-bolder mx-auto '>
                    PRODUCTS TO SHOW
                </h3>
            </div>
            <div className='row gx-2 gy-2 mt-2'>
                {
                    data?.data.data.map((product) => (
                        <div className='col-md-2' key={product.id}>
                            <Link to={`/productdetails/${product.id}/${product.category.name}`} className='text-decoration-none'>
                                <div className='product px-3 mb-2 card h-100'>
                                    <img
                                        className='w-100 card-img-top'
                                        alt={product.title}
                                        src={product.imageCover}
                                    />
                                    <div className='card-body'>
                                        <span className='d-block text-success card-title'>
                                            {product.title.split(' ').slice(0, 2).join(' ')}
                                        </span>
                                        <span className='d-block card-text'>
                                            {product.category.name}
                                        </span>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <span className='text-success'>
                                            {product.price} EGP
                                        </span>
                                        <span>
                                            {product.ratingsAverage}<i className='fas fa-star text-warning'></i>
                                        </span>
                                    </div>
                                    <button className='btn btn-outline-success mt-1'>
                                        Add To Cart
                                    </button>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

