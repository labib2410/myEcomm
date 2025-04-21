import { useFormik } from "formik";
import * as validation from 'yup';
import axios from 'axios';
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext/UserContext";

export default function SignIn() {
    let { setUserToken } = useContext(UserContext);
    let [Error, setError] = useState('');
    let [isLoad, setisLoad] = useState(false);
    let navigate = useNavigate();

    const yupObj = validation.object().shape({
        email: validation.string().email('email is invalid').required('this field is required'),
        password: validation.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password is invalid').required('this field is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yupObj,
        onSubmit: handleLogin
    });

    async function handleLogin(values) {
        setisLoad(true);
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",
            values
        ).then((response) => {
            if (response.data.message === 'success') {
                console.log(response);
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('userEmail', response.data.user.email);
                setError('');
                setisLoad(false);
                setUserToken(response.data.token);
                navigate('/');

            }
        }).catch((error => {
            setisLoad(false);
            setError(error.response?.data?.message);
        }))

    }

    return (
        <>
            {Error ? <div className='alert alert-danger p-1 mt-1'>
                {Error}
            </div> : null}
            <div className="p-3 container-fluid d-flex align-items-center justify-content-center mt-2 vh-50">
                <form onSubmit={formik.handleSubmit} className="row g-2 align-items-center justify-content-md-center">
                    <div className="form-floating mb-3 col-md-12">
                        <input
                            type="email"
                            className="form-control"
                            id="email-1"
                            placeholder="name@example.com"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        <label htmlFor="email-1">Email address</label>

                        {formik.errors.email && formik.touched.email ? (
                            <div className='alert alert-danger p-1 mt-1'>{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="form-floating col-md-12">
                        <input
                            type="password"
                            className="form-control"
                            id="pass-1"
                            placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <label htmlFor="pass-1">Password</label>
                        {formik.errors.password && formik.touched.password ? (
                            <div className='alert alert-danger p-1 mt-1'>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div className="col-md-12">
                        <button className='btn btn-outline-success ms-3  fw-bold  p-2 mt-1 rounded-2' type="submit">
                            {
                                isLoad ? <i className="fas fa-spinner fa-spin"></i> : "Log in"
                            }
                        </button>
                        <Link
  to="/signup"
  className="btn btn-outline-success text-danger ms-3 fw-bold mt-1"
>
  SignUp
</Link>



                    </div>
                </form>
            </div>
        </>
    );
}
