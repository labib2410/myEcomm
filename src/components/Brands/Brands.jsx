import { Link } from 'react-router-dom';
import Spinner from "../spinner/spinner";
import useBrands from "../../myHooks/useBrands";
export default function Brands() {

    let { data, isLoading, isError, error } = useBrands();
    if (isLoading) {
        return (
            <Spinner />
        );
    }
    if (isError) {
        return (
            <div>
                <h3>
                    {error}
                </h3>
            </div>
        );
    }
    return (
        <>
            <div className='container'>
                <div className='d-flex justify-content-center align-items-center'>
                    <h3 className='fs-2 text-danger fw-bolder mx-auto '>
                        Brands TO SHOW
                    </h3>
                </div>
                <div className='row gx-2 gy-2 mt-2'>
                    {
                        data?.data.data.map((brand) => (
                            <div className='col-md-3' key={brand.id}>
                                <Link to={'/'} className='text-decoration-none'>
                                    <div className='product px-3  mb-2 card h-100' >
                                        <img
                                            className='w-100 card-img-top'
                                            alt={brand.name}
                                            src={brand.image}
                                        />
                                        <div className='card-body'>
                                            <span
                                                className='d-block text-success card-title fw-bolder'
                                            >
                                                {brand.name.split(' ').slice(0, 2).join(' ')}
                                            </span>
                                        </div>

                                    </div>
                                </Link>

                            </div>
                        ))
                    }


                </div>
            </div >
        </>
    );
}
