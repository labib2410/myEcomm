import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext/UserContext";
import { CartContext } from "../../Context/CartContext/CartContext";

export default function Navbar() {
    let { userToken, setUserToken } = useContext(UserContext);
    let { cart2 } = useContext(CartContext);
    console.log(cart2);
    let navigate = useNavigate();
    function logOut() {
        localStorage.removeItem('userToken');
        setUserToken(null);
        navigate('/signin');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
            <div className="container">
                {/* Brand Name */}
                <h1 className="navbar-brand fw-bold text-success">Market</h1>

                {/* Navbar Toggler Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {userToken !== null && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/"
                                        end
                                        activeClassName="active"
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/products"
                                        activeClassName="active"
                                    >
                                        Products
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/brands"
                                        activeClassName="active"
                                    >
                                        Brands
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/categories"
                                        activeClassName="active"
                                    >
                                        Categories
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/allorders"
                                        activeClassName="active"
                                    >
                                        My Orders
                                    </NavLink>
                                </li>
                                <li className="nav-item position-relative">
                                    <NavLink
                                        className="nav-link"
                                        to="/cart"
                                        activeClassName="active"
                                    >
                                        <i className="fas fa-shopping-cart fa-lg"></i>
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {cart2?.numOfCartItems}
                                        </span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Authentication Buttons */}
                    <div className="d-flex gap-2">
                        {userToken === null ? (
                            <>
                                <NavLink className="btn btn-outline-success" to="/signin">Sign In</NavLink>
                                <NavLink className="btn btn-outline-success" to="/signup">Sign Up</NavLink>
                            </>
                        ) : (
                            <button className="btn btn-danger" onClick={logOut}>Log Out</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}