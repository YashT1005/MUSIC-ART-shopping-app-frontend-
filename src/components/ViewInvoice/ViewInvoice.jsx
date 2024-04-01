import styles from "./ViewInvoice.module.css";
import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import music_image from "../../assets/music.png";
import { useNavigate } from "react-router-dom";
import { context } from "../../App";
import MobileFooter from "../MobileFooter/MobileFooter";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

import { createInvoice, deleteCart } from "../../apis/data";

const ViewInvoice = () => {
    const { state } = useLocation();
    const [data, setData] = useState(state.data.data);
    const navigate = useNavigate();
    const contextData = useContext(context);
    const [total, setTotal] = useState(0);
    const [address, setAdress] = useState(state.data.address);
    const [mode, setMode] = useState(state.data.mode);
    useEffect(() => {
        const fetchData = () => {
            let t = 0;
            data.map((item) => {
                t = t + item.productData.price * item.quantity;
            });
            setTotal(t);
        };
        fetchData();
    }, []);

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
                        <p>Home / Invoice</p>
                    </nav>
                </div>
                <div className={styles.checkout_container}>
                    <button
                        onClick={() => navigate("/invoice")}
                        className={styles.back_btn}>
                        Back to invoices
                    </button>
                    <div className={styles.checkout_box}>
                        <h3>Invoice</h3>
                        <div className={styles.details_box}>
                            <div className={styles.left_section}>
                                <div className={styles.address_box}>
                                    <h3>1. Delivery address</h3>
                                    <div className={styles.name_box}>
                                        <p className={styles.name}>
                                            {contextData.name}
                                        </p>
                                        <div>
                                            {address}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className={styles.payment_box}>
                                    <h3>2. Payment method</h3>
                                    <div className={styles.mode}>
                                        {mode}
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

                                            <p>Delivery : Monday - Free Delivery</p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className={styles.right_section}>
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
                        onClick={() => navigate("/invoice")}
                        className={styles.back_btn_mobile}>
                        <FaArrowLeftLong className={styles.small_icon} />
                    </button>
                    <h2>Checkout</h2>
                    <h3 className={styles.red}>1. &nbsp;Delivery Address</h3>
                    <div className={styles.mobile_address}>
                        <p> {contextData.name}</p>
                        <p>{address}</p>
                    </div>
                    <hr />
                    <h3 className={styles.red}>2. &nbsp;Payment Method</h3>
                    <div className={styles.mobile_mode}>
                        {mode}
                    </div>
                    <hr />
                    <h3 className={styles.red}>3. &nbsp;Review items and delivery</h3>
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

                            <p>Delivery : Monday - Free Delivery</p>
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
                    </div>
                </div>
            </div>

            <Footer />
            <MobileFooter />
        </div>
    );
};

export default ViewInvoice;
