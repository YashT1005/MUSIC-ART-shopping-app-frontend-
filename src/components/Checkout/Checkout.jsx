import styles from "./Checkout.module.css";
import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import music_image from "../../assets/music.png";
import { useNavigate } from "react-router-dom";
import { context } from "../../App";
import MobileFooter from "../MobileFooter/MobileFooter";
import { FaArrowLeftLong } from "react-icons/fa6";
import { createInvoice, deleteCart } from "../../apis/data";

const Checkout = () => {
    const navigate = useNavigate();
    const contextData = useContext(context);
    const [data, setData] = useState();
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [address, setAdress] = useState();
    const [error, setError] = useState(false);
    const [mode, setMode] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await contextData.fetchCartData();
            if (response) {
                if (response !== "No products in the cart") {
                    setData(response);
                    let t = 0;
                    response.map((item) => {
                        t = t + item.productData.price * item.quantity;
                    });
                    setTotal(t);
                }
            }
        };
        fetchData();
    }, [count]);

    const handleChangeAddress = (e) => {
        setAdress(e.target.value);
    };

    const handleChangeMode = (e) => {
        setMode(e.target.value);
    };

    const handleClick = async () => {
        if (!mode || !address) {
            setError(true);
            return;
        }
        const response = await createInvoice({
            data: data,
            address: address,
            mode: mode,
        });

        if (response) {
            const response2 = await deleteCart();
            if (response2) {
                navigate("/successfull");
            }
        } else {
            return;
        }
    };

    return (
        <div className={styles.main_container}>
            <div className={styles.header}>
                <Header logout={"showlogout"} />
            </div>
            <div className={styles.mobile_header}>
                <div>
                    <nav className={styles.navbar}>
                        <div className={styles.logo}>
                            <img src={music_image} />
                            <h2>Musicart</h2>
                        </div>
                    </nav>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.navbar_container}>
                    <nav className={styles.navbar}>
                        <div className={styles.logo}>
                            <img src={music_image} />
                            <h2>Musicart</h2>
                        </div>
                        <p>Home / Checkout</p>
                    </nav>
                </div>
                <div className={styles.checkout_container}>
                    <button
                        onClick={() => navigate("/cart")}
                        className={styles.back_btn}>
                        Back to cart
                    </button>
                    <div className={styles.checkout_box}>
                        <h3>Checkout</h3>
                        <div className={styles.details_box}>
                            <div className={styles.left_section}>
                                <div className={styles.address_box}>
                                    <h3>1. Delivery address</h3>
                                    <div className={styles.name_box}>
                                        <p className={styles.name}>
                                            {contextData.name}
                                        </p>
                                        <textarea
                                            onChange={handleChangeAddress}
                                            value={address}
                                            cols="25"
                                            rows="5"></textarea>
                                        {error && (
                                            <p style={{ color: "red" }}>
                                                Required *
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <hr />
                                <div className={styles.payment_box}>
                                    <h3>2. Payment method</h3>
                                    <div>
                                        <select onChange={handleChangeMode}>
                                            <option
                                                selected
                                                disabled>
                                                Mode of payment
                                            </option>
                                            <option value="Pay on Delivery">
                                                Pay on Delivery
                                            </option>
                                            <option value="UPI">UPI</option>
                                            <option value="Card">Card</option>
                                        </select>
                                        {error && (
                                            <p style={{ color: "red" }}>
                                                Required *
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <hr />
                                <div className={styles.review_items}>
                                    <h3>3. Review items and delivery</h3>
                                    <div className={styles.product_box}>
                                        <div className={styles.image_box}>
                                            {data?.map((item, index) => {
                                                return (
                                                    <img
                                                        src={
                                                            item.productData
                                                                .imageURL1
                                                        }
                                                    />
                                                );
                                            })}
                                        </div>
                                        <div id={styles.product_detail}>
                                            {data !== undefined ? (
                                                <>
                                                    {" "}
                                                    <h3>
                                                        {
                                                            data[0].productData
                                                                .name
                                                        }
                                                    </h3>
                                                    <p className={styles.color}>
                                                        Color :{" "}
                                                        {
                                                            data[0].productData
                                                                .color
                                                        }
                                                    </p>
                                                </>
                                            ) : (
                                                <></>
                                            )}

                                            <p>Estimated Delivery : </p>
                                            <p>Monday - Free Standard Delivery</p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className={styles.lastline}>
                                    <button
                                        onClick={handleClick}
                                        className={styles.place_btn}>
                                        Place your order
                                    </button>
                                    <div>
                                        <h4>Order Total : Rs {total + 45}</h4>
                                        <p>
                                            By placing your order, you agree to
                                            Musicart privacy notice and
                                            conditions of use.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.right_section}>
                                <button
                                    onClick={handleClick}
                                    className={styles.rightplace_btn}>
                                    Place your order
                                </button>
                                <p className={styles.smallfont}>
                                    By placing your order, you agree to Musicart
                                    privacy notice and conditions of use.
                                </p>
                                <hr />
                                <h3>Order Summary</h3>
                                <div>
                                    <div className={styles.grey}>
                                        <p>Items : </p>
                                        <p>Rs {total}</p>
                                    </div>
                                    <div className={styles.grey}>
                                        <p>Delivery : </p>
                                        <p>Rs 45</p>
                                    </div>
                                </div>
                                <hr />
                                <div className={styles.red}>
                                    <h3>Order Total : </h3>
                                    <h3>Rs {total + 45}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.checkout_mobile_container}>
                    <button
                        onClick={() => navigate("/cart")}
                        className={styles.back_btn_mobile}>
                        <FaArrowLeftLong className={styles.small_icon} />
                    </button>
                    <h2>Checkout</h2>
                    <h3 className={styles.red}>1. Delivery Address</h3>
                    <textarea
                        onChange={handleChangeAddress}
                        value={address}
                        id=""
                        cols="20"
                        rows="7"></textarea>
                    {error && <p style={{ color: "red" }}>Required *</p>}
                    <hr />
                    <h3 className={styles.red}>2. Payment Method</h3>
                    <select onChange={handleChangeMode}>
                        <option
                            selected
                            disabled>
                            Mode of payment
                        </option>
                        <option value="Pay on Delivery">Pay on Delivery</option>
                        <option value="UPI">UPI</option>
                        <option value="Card">Card</option>
                    </select>
                    {error && <p style={{ color: "red" }}>Required *</p>}
                    <hr />
                    <h3 className={styles.red}>3. Review items and delivery</h3>
                    <div className={styles.product_box}>
                        <div className={styles.image_box}>
                            {data?.map((item, index) => {
                                return <img src={item.productData.imageURL1} />;
                            })}
                        </div>
                        <div id={styles.product_detail}>
                            {data !== undefined ? (
                                <>
                                    {" "}
                                    <h3>{data[0].productData.name}</h3>
                                    <p className={styles.color}>
                                        Color : {data[0].productData.color}
                                    </p>
                                </>
                            ) : (
                                <></>
                            )}

                            <p>Estimated Delivery : </p>
                            <p>Monday - Free Standard Delivery</p>
                        </div>
                        <h3>Order Summary</h3>
                        <div>
                            <div className={styles.grey}>
                                <p>Items : </p>
                                <p>Rs {total}</p>
                            </div>
                            <div className={styles.grey}>
                                <p>Delivery : </p>
                                <p>Rs 45</p>
                            </div>
                        </div>
                        <hr />
                        <div className={styles.red}>
                            <h3>Order Total : </h3>
                            <h3>Rs {total + 45}</h3>
                        </div>
                        <button
                            onClick={handleClick}
                            className={styles.rightplace_btn}>
                            Place your order
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
            <MobileFooter />
        </div>
    );
};

export default Checkout;
