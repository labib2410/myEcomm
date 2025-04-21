import { useFormik } from "formik";
import * as validation from 'yup';
import axios from 'axios';
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext/UserContext";
export default function SignUp() {
    let { setUserToken } = useContext(UserContext);
    let [Error, setError] = useState('');
    let [isLoad, setisLoad] = useState(false);
    let navigate = useNavigate();
    let yupObj = validation.object().shape({
        name: validation.string().min(3, 'min length is 3').max(10, 'max length is 10').required('this field is required'),
        email: validation.string().email('email is invalid').required('this field is required'),
        phone: validation.string().matches(/^\d{10,15}$/, 'phone is invalid').required('this field is required'),
        password: validation.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password is invalid').required('this field is required'),
        rePassword: validation.string().oneOf([validation.ref('password')], 'password and repassword must be same').required('this field is required')
    });
    async function handleRegister(formValues) {
        setisLoad(true);
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", formValues)
            .then((response) => {
                if (response.data.message === 'success') {
                    localStorage.setItem('userToken', response.data.token);
                    setUserToken(response.data.token);
                    setError('');
                    setisLoad(false);
                    navigate('/');

                }
            })
            .catch((error => {
                setisLoad(false);
                setError(error.response?.data?.message);
            }))
    }



    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        // validate: myValidate,
        validationSchema: yupObj,
        onSubmit: handleRegister
    });
    return (
        <>

            {Error ? <div className='alert alert-danger p-1 mt-1'>
                {Error}
            </div> : null}
            <div className="p-3 container-fluid d-flex align-items-center justify-content-center mt-2 vh-50">

                <form onSubmit={formik.handleSubmit} className="row g-2 align-items-center justify-content-md-center">
                    {['name', 'email', 'phone', 'password', 'rePassword'].map((field, index) => (
                        <div key={index} className="form-floating col-md-12">
                            <input
                                type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                                className="form-control"
                                id={field}
                                name={field}
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            <label htmlFor={field}>
                                {field.charAt(0).toUpperCase() + field.slice(1).replace('rePassword', 'Confirm Password')}
                            </label>
                            {formik.errors[field] && formik.touched[field] && (
                                <div className='alert alert-danger p-1 mt-1'>{formik.errors[field]}</div>
                            )}
                        </div>
                    ))}
                    <div className="col-md-12">
                        <button className='btn btn-success' type="submit">
                            {
                                isLoad ? <i className="fas fa-spinner fa-spin"></i> : "Register"
                            }

                        </button>
                        <Link
                            to="/signin"
                            className="btn btn-outline-success text-danger ms-3 fw-bold mt-1"
                        >
                            SignIn
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
