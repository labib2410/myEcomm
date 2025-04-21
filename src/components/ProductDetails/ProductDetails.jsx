import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import Spinner from '../spinner/spinner';
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";
import toast from 'react-hot-toast';

export default function ProductDetails() {

    const { addItemToCart, setCart,setCart2 } = useContext(CartContext);
    let [btnLoad, setBtnLoad] = useState(false);
    let [productId, setProductId] = useState(0);
    async function addToCart(productId) {
        setProductId(productId);
        setBtnLoad(true);
        let res = await addItemToCart(productId);


        setCart(res);
        if (res.status === "success") {
            setCart2(res);
            toast.success("Item added to cart!");
            setBtnLoad(false);

        } else {
            toast.error("Failed to add item");
            setBtnLoad(false);

        }
    }
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };
    const settings2 = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // default for large screens
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1200, // large screens
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 992, // medium devices
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768, // tablets
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576, // phones
                settings: {
                    slidesToShow: 1, // ✅ show only one product
                },
            },
        ],
    };

    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    let { id, category } = useParams();
    let [Details, setDetails] = useState(null);
    let [related, setRelated] = useState([]);

    function getDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({ data }) => {
                setDetails(data.data);
                setLoading(false);
            })
            .catch((error) => console.error("Error loading product details", error));
    }

    function getRelated(category) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                let all = data.data;
                setRelated(all.filter(product => product.category.name === category));
                setLoading2(false);
            })
            .catch((error) => console.error("Error loading related products", error));
    }

    useEffect(() => {
        getDetails(id);
        getRelated(category);
    }, [id, category]);

    // Return Spinner if any of the loading states are true
    if (loading || loading2) {
        return <Spinner />;
    }

    return (
        <>
            <div className='container mb-3'>
                <div className='row mt-md-5 justify-content-md-between align-items-md-center p-md-2 g-2'>
                    <div className='col-md-3'>
                        <Slider {...settings} className='mb-2'>
                            {Details?.images?.map((imge, index) => (
                                <img
                                    key={index}
                                    src={imge}
                                    alt={Details?.title}
                                    className='w-100'
                                />
                            ))}
                        </Slider>
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-success fw-light mb-1'>
                            {Details?.title}
                        </h1>
                        <p className='lead mb-1'>
                            {Details?.description}
                        </p>
                        <h3 className='text-success fw-bolder mb-1'>
                            {Details?.category?.name}
                        </h3>
                        <div className='d-flex justify-content-between'>
                            <span className='text-secondary-subtle'>
                                {Details?.price} EGP
                            </span>
                            <span className='text-success'>
                                {Details?.ratingsAverage}
                                <i className='fas fa-star text-warning'></i>
                            </span>
                        </div>
                        <button className='btn btn-outline-success mt-1 w-100'
                            onClick={() => addToCart(Details.id)}
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
            <div className='container mb-2 mt-2 mx-auto d-flex align-items-center justify-content-center'>
    <span className='text-danger fs-1 fw-bolder m-auto'>
        TAKE A LOOK
    </span>
</div>
<div className='container mt-3 related-slider'>
    <Slider {...settings2} className='mb-2'>
        {related.map((product) => (
            <div className='' key={product.id}>
                <div className='product p-3 me-1 mb-2 card h-100'>
                    <Link to={`/productdetails/${product.id}/${product.category.name}`} className='text-decoration-none'>
                        <img
                            className='w-100 card-img-top h-25'
                            alt={product.title}
                            src={product.imageCover}
                        />
                        <div className='card-body'>
                            <span className='d-block text-success card-title w-100'>
                                {product.title.split(' ').slice(0, 2).join(' ')}
                            </span>
                            <span className='d-block card-text text-secondary'>
                                {product.category.name}
                            </span>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span className='text-success'>
                                {product.price} EGP
                            </span>
                            <span className='text-success'>
                                {product.ratingsAverage}
                                <i className='fas fa-star text-warning'></i>
                            </span>
                        </div>
                    </Link>
                    <div className='card-footer bg-secondary-subtle mt-2'>
                        <button
                            className='btn btn-outline-success mt-1 w-100'
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
    </Slider>
</div>

        </>
    );
}
