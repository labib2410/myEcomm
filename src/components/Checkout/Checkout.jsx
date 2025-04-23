import { useFormik } from "formik";
import * as validation from 'yup';
import { useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";

export default function Checkout() {
    let { checkout } = useContext(CartContext);
    let [isLoad, setisLoad] = useState(false);

    const yupObj = validation.object().shape({
        details: validation.string()
            .matches(/^[A-Z][a-z\s]{10,50}$/, 'Address is invalid')
            .required('This field is required'),
        phone: validation.string()
            .matches(/^[0-9]{11}$/, 'Phone is invalid')
            .required('This field is required'),
        city: validation.string()
            .matches(/^[A-Z][a-z]{2,20}$/, 'City is invalid')
            .required('This field is required'),
    });

    const formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        validationSchema: yupObj,
        onSubmit: () => handleCheckout('https://labib2410.github.io/#', formik.values)
    });

    async function handleCheckout(url, formValues) {
        setisLoad(true);
        try {
            const res = await checkout(url, formValues);
            if (res.status === 'success') {
                window.location.href = res.session.url;
            } else {
                // You can show an error message here if needed
                console.error('Checkout failed:', res);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            // Optionally show error to user
        } finally {
            setisLoad(false);
        }
    }


    return (
        <>
            <div className="p-3 container-fluid d-flex align-items-center justify-content-center mt-2 vh-50">
                <form onSubmit={formik.handleSubmit} className="row g-2 align-items-center justify-content-md-center">

                    {/* Address */}
                    <div className="form-floating mb-3 col-md-12">
                        <input
                            type="text"
                            className="form-control"
                            id="details"
                            placeholder="Enter Your Address"
                            name="details"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.details}
                        />
                        <label htmlFor="details">Address</label>
                        {formik.errors.details && formik.touched.details && (
                            <div className="text-danger small mt-1">{formik.errors.details}</div>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="form-floating mb-3 col-md-12">
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            placeholder="01205721704"
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        <label htmlFor="phone">Phone</label>
                        {formik.errors.phone && formik.touched.phone && (
                            <div className="text-danger small mt-1">{formik.errors.phone}</div>
                        )}
                    </div>

                    {/* City */}
                    <div className="form-floating mb-3 col-md-12">
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            placeholder="Cairo"
                            name="city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                        />
                        <label htmlFor="city">City</label>
                        {formik.errors.city && formik.touched.city && (
                            <div className="text-danger small mt-1">{formik.errors.city}</div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="col-md-12">
                        <button className="btn btn-success" type="submit" disabled={isLoad}>
                            {isLoad ? <i className="fas fa-spinner fa-spin"></i> : "Pay Now"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
