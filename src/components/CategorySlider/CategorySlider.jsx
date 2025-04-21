import Slider from "react-slick";
import Spinner from "../spinner/spinner"; // Assuming you have a spinner component
import useCategories from '../../myHooks/useCategories';
export default function CategorySlider() {
    let { data, isLoading, isError, error } = useCategories();
    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 576, settings: { slidesToShow: 1 } },
        ],
    };


    if (isLoading) {
        return <Spinner />; // Show a spinner while loading
    }

    if (isError) {
        return <div>{error}</div>; // Display the error message if there's an issue
    }

    return (
        <div className='container-md my-5 related-slider'>
            <Slider {...settings}>
                {data?.data.data.map((category) => (
                    <div key={category.slug} className="text-center px-2">
                        <img
                            src={category?.image}
                            alt={category?.name}
                            className='w-100 cateSlider-home'
                        />
                        <p className='text-success fw-light fs-6 mt-2'>
                            {category?.name}
                        </p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

