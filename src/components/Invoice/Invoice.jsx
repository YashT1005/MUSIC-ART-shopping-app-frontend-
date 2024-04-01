import React, { useContext, useEffect, useState } from "react";
import styles from "./Invoice.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import music_image from "../../assets/music.png";
import { useNavigate } from "react-router-dom";
import { context } from "../../App";
import MobileFooter from "../MobileFooter/MobileFooter";
import { IoCartOutline } from "react-icons/io5";
import { PiBag } from "react-icons/pi";
import { IoReceipt } from "react-icons/io5";
import { getInvoice } from "../../apis/data";
import { FaArrowLeftLong } from "react-icons/fa6";

const Invoice = () => {
    const [data, setData] = useState();
    const [name, setName] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getInvoice();
            if (response.success === true) {
                setData(response.data);
                console.log(response.data);
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();
    const contextData = useContext(context);
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
                    <div className={styles.login_navbar}>
                        <button
                            onClick={() => navigate("/cart")}
                            className={styles.viewcart_btn}>
                            <IoCartOutline className={styles.cart_icon} />
                            <p>View Cart</p>
                        </button>
                    </div>
                </div>
                <div className={styles.invoice_container}>
                    <button
                        onClick={() => navigate("/")}
                        className={styles.back_btn}>
                        Back to Home
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className={styles.back_btn_mobile}>
                        <FaArrowLeftLong className={styles.small_icon} />
                    </button>
                    <h3 className={styles.heading}>My Invoices</h3>
                    {data !== undefined ? (
                        <div className={styles.invoice_box}>
                            {data.map((item, index) => {
                                return (
                                    <>
                                        <div
                                            key={index}
                                            className={
                                                styles.individual_invoice
                                            }>
                                            <div className={styles.left}>
                                                <div>
                                                    <IoReceipt
                                                        className={
                                                            styles.receipt
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <p className={styles.name}>
                                                        {contextData.name}
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.address
                                                        }>
                                                        {item.address}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    navigate("/viewinvoice", {
                                                        state: {
                                                            data: item,
                                                        },
                                                    });
                                                }}
                                                className={styles.view_btn}>
                                                View Invoice
                                            </button>
                                        </div>
                                        <hr />
                                    </>
                                );
                            })}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <Footer />
            <MobileFooter />
        </div>
    );
};

export default Invoice;
