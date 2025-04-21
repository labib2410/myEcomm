import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";
import Spinner from "../spinner/spinner";

export default function OrdersComponent() {
    const { orders } = useContext(CartContext);
    const [myOrders, setMyOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);

    async function getOrders(){
        const allOrders = await orders();
        setMyOrders(allOrders.data.data);   
        setLoading(false);                              
    }
    useEffect(() => {
        getOrders();
    });
    if(isLoading){
        return <Spinner />
    }
    const userEmail = localStorage.getItem("userEmail");

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4 text-danger">My Orders</h2>
            <div className="row g-4">
                {myOrders.length > 0 ? (
                    myOrders
                        .filter(order => order.user?.email === userEmail)
                        .map((order, index) => (
                            <div className="col-12 col-md-6 col-lg-4" key={index}>
                                <div className="card border-success h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title text-success">Order #{order.id || index + 1}</h5>
                                        <p><strong>Total:</strong> {order.totalOrderPrice} EGP</p>
                                        <p><strong>Payment:</strong> {order.paymentMethodType}</p>
                                        <p><strong>Paid:</strong> {order.isPaid ? "✅ Yes" : "❌ No"}</p>
                                        <p><strong>Delivered:</strong> {order.isDelivered ? "✅ Yes" : "❌ No"}</p>
                                        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                                        <hr />
                                        <h6 className="mb-1">Shipping Address</h6>
                                        <p className="mb-1"><strong>City:</strong> {order.shippingAddress?.city}</p>
                                        <p className="mb-1"><strong>Phone:</strong> {order.shippingAddress?.phone}</p>
                                        <p className="mb-1"><strong>Details:</strong> {order.shippingAddress?.details}</p>
                                        <hr />
                                        <h6 className="mb-2">Products</h6>
                                        <ul className="list-group list-group-flush">
                                            {order.cartItems.map((item, i) => (
                                                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                                    {item.product?.title?.slice(0, 25)}...
                                                    <span className="badge bg-success rounded-pill">{item.count}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))
                ) : (
                    <div className="text-center text-muted">No orders found.</div>
                )}
            </div>
        </div>
    );
}
