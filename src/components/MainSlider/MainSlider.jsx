
import Slider from "react-slick";
import slide1 from '../../assets/3d-illustration-people-with-mobile-smartphone-use-highspeed-internet_1150-65881.avif';
import slide2 from '../../assets/3d-rendering-ecommerce-background_23-2151386693.avif';
import MainSlider1 from '../../assets/cyber-monday-shopping-sales_23-2148688502.avif';
import MainSlider2 from '../../assets/isometric-laptop-with-shopping-cart-keypad_1262-16544.avif';
import MainSlider3 from '../../assets/online-shopping-shopping-cart-placed-alongside-notebook-blue_1150-19158.avif';

export default function MainSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows:false,
    };
    return (
        <>
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-md-9'>
                        <Slider {...settings} className='mb-2'>
                            {[
                                <img
                                    key={1}
                                    src={MainSlider1}
                                    className='w-100 slider-img'
                                    alt="Slide 1"
                                />,
                                <img
                                    key={2}
                                    src={MainSlider2}
                                    className='w-100 slider-img'
                                    alt="Slide 2"
                                />,
                                <img
                                    key={3}
                                    src={MainSlider3}
                                    className='w-100 slider-img'
                                    alt="Slide 3"
                                />,
                            ]}
                        </Slider>
                    </div>
                    <div className='col-md-3 d-flex flex-column gap-2'>
                        <img
                            key={4}
                            src={slide1}
                            className='w-100 side-img'
                            alt="Side 1"
                        />
                        <img
                            key={5}
                            src={slide2}
                            className='w-100 side-img'
                            alt="Side 2"
                        />
                    </div>
                </div>
            </div>
        </>
    );

}
