import { Link } from 'react-router-dom';
import Spinner from "../spinner/spinner";
import useCategories from "../../myHooks/useCategories";
export default function Categories() {

    let { data, isLoading, isError, error } = useCategories();
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
                    <h3 className='fs-2 text-danger fw-bolder mx-auto'>
                        Categories TO SHOW
                    </h3>
                </div>
                <div className='row gx-2 gy-4 mt-2'>
                    {data?.data.data.map((category) => (
                        <div className='col-md-3' key={category.id}>
                            <Link to='/' className='text-decoration-none'>
                                <div className='category p-3 mb-2 card h-100'>
                                    <img
                                        className='w-100 card-img-top'
                                        alt={category.name}
                                        src={category.image}
                                    />
                                    <div className='card-body'>
                                        <span className='d-block text-success card-title fw-bolder'>
                                            {category.name.split(' ').slice(0, 2).join(' ')}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
