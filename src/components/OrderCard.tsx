import { useState } from "react";
import { convertDate } from "../utils/convertDate";
import { formatCurrency } from "../utils/formatCurrency";
import Carousel from "./Carousel";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { ADMIN_TOKEN, API_URL, errorToast, successToast } from "../config";

const OrderCard: React.FC<{ order: any; fetchAndReloadOrders: any }> = ({
    order,
    fetchAndReloadOrders,
}) => {
    const [takingAction, setTakingAction] = useState(false);

    const markAsDelivered = () => {
        setTakingAction(true);
        axios({
            method: "PUT",
            url: `${API_URL}/order/${order._id}/status/delivered`,
            headers: {
                "x-auth-token": ADMIN_TOKEN,
            },
        })
            .then((res) => {
                console.log("RES: ", res);
                fetchAndReloadOrders();
                setTakingAction(false);
                successToast("Order delivered");
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                setTakingAction(false);
                errorToast(error.message);
            });
    };

    const cancelOrder = () => {
        setTakingAction(true);
        axios({
            method: "PUT",
            url: `${API_URL}/order/${order._id}/status/cancelled`,
            headers: {
                "x-auth-token": ADMIN_TOKEN,
            },
        })
            .then((res) => {
                console.log("RES: ", res);
                setTakingAction(false);
                successToast("Order cancelled");
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                setTakingAction(false);
                errorToast(error.message);
            });
    };

    const markAsReady = () => {
        setTakingAction(true);
        axios({
            method: "PUT",
            url: `${API_URL}/order/${order._id}/status/ready`,
            headers: {
                "x-auth-token": ADMIN_TOKEN,
            },
        })
            .then((res) => {
                console.log("RES: ", res);
                fetchAndReloadOrders();
                setTakingAction(false);
                successToast("Order ready");
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                setTakingAction(false);
                errorToast(error.message);
            });
    };

    return (
        <div className="orderCard">
            <Carousel images={order.productData.productImages} />
            <h2 className="cardTitle">{order.productData.title}</h2>
            <p className="cardSubtitle">{order.productData.description}</p>

            <div className="productOrderDetails">
                <ul>
                    <li>
                        <span>Price: </span>{" "}
                        {formatCurrency.format(order.price)}{" "}
                    </li>
                    {order.color ? (
                        <>
                            <li>
                                <span>Color: </span> {order.color}
                            </li>
                            <li>
                                <span>Length: </span> {order.length}
                            </li>
                        </>
                    ) : (
                        ""
                    )}
                    <li>
                        <span>Payment Method: </span>
                        {order.shippingDetails.paymentMethod} (
                        {formatCurrency.format(order.price)})
                    </li>
                    <li>
                        <span>Quantity: </span>
                        {order.quantity}
                    </li>
                    <li>
                        <span>Date Ordered: </span>
                        {convertDate(order.dateAdded, "fulldate")}
                    </li>
                    <li>
                        <span>Order Status: </span>{" "}
                        <i
                            className={
                                order.status === "in progress"
                                    ? "in-progress"
                                    : `${order.status}`
                            }
                            title="Order in progress"
                        >
                            {order.status}
                        </i>
                    </li>
                </ul>
            </div>
            <div className="shippingDetails">
                <h4>Shipping Details</h4>
                <ul>
                    <li>
                        <span>City: </span> {order.shippingDetails.city}
                    </li>
                    <li>
                        <span>Payment Method: </span>
                        {order.shippingDetails.paymentMethod} (
                        {formatCurrency.format(order.price)})
                    </li>
                    <li>
                        <span>Phone Number: </span>{" "}
                        {order.shippingDetails.phoneNumber}
                    </li>
                    <li>
                        <span>Postal Code: </span>{" "}
                        {order.shippingDetails.postalCode
                            ? order.shippingDetails.postalCode
                            : "No Postal Code"}
                    </li>
                    <li>
                        <span>State: </span>
                        {order.shippingDetails.selectedState}
                    </li>
                    <li>
                        <span>Street Address: </span>
                        {order.shippingDetails.streetAddress}
                    </li>
                </ul>
                {order.status === "in progress" || order.status === "ready" ? (
                    <>
                        <div className="orderCardFooter">
                            {order.history[2].confirmed === false ? (
                                <button
                                    className="spin markAsDelivered ready"
                                    disabled={takingAction}
                                    onClick={markAsReady}
                                >
                                    {takingAction ? (
                                        <ImSpinner8 />
                                    ) : (
                                        "Mark as 'ready for delivery'"
                                    )}
                                </button>
                            ) : (
                                <button
                                    className="spin markAsDelivered"
                                    disabled={takingAction}
                                    onClick={markAsDelivered}
                                >
                                    {takingAction ? (
                                        <ImSpinner8 />
                                    ) : (
                                        "Mark as delivered"
                                    )}
                                </button>
                            )}
                            <button
                                className="spin cancelOrder"
                                disabled={takingAction}
                                onClick={cancelOrder}
                            >
                                {takingAction ? <ImSpinner8 /> : "Cancel order"}
                            </button>
                        </div>
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default OrderCard;
