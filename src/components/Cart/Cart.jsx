import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import music_image from "../../assets/music.png";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { PiBag } from "react-icons/pi";
import { context } from "../../App";
import { modifyQuantity } from "../../apis/data";
import { FaArrowLeftLong } from "react-icons/fa6";
import MobileFooter from "../MobileFooter/MobileFooter";

const Cart = () => {
    const navigate = useNavigate();
    const contextData = useContext(context);
    const [data, setData] = useState();
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            contextData.fetchCartData();
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

    const options = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7" },
        { value: 8, label: "8" },
    ];

    const handleSelectChange = async (e) => {
        const newValue = parseInt(e.target.value);
        const response = await modifyQuantity({
            id: e.target.id,
            quantity: newValue,
        });
        if (response) {
            setCount(count + 1);
        }
    };
    return (
        <div className={styles.main_container}>
            <Header logout={"showlogout"} />
            <div className={styles.container}>
                <div className={styles.navbar_container}>
                    <nav className={styles.navbar}>
                        <div className={styles.logo}>
                            <img src={music_image} />
                            <h2>Musicart</h2>
                        </div>
                        <p>Home / View Cart</p>
                    </nav>
                    <div className={styles.login_navbar}>
                        <button className={styles.viewcart_btn}>
                            <IoCartOutline className={styles.cart_icon} />
                            <p>View Cart</p>{" "}
                        </button>
                    </div>
                </div>
                <div className={styles.cart_container}>
                    <button
                        onClick={() => navigate("/")}
                        className={styles.back_btn}>
                        Back to products
                    </button>
                    <div className={styles.cart_box}>
                        <div className={styles.bag_box}>
                            <PiBag className={styles.bag_icon} />
                            <h3>My Cart</h3>
                        </div>
                        {data !== undefined ? (
                            <div className={styles.product_container}>
                                <div className={styles.left_box}>
                                    <div className={styles.product_box}>
                                        {data?.map((item, index) => {
                                            return (
                                                <div
                                                    className={
                                                        styles.individual_product
                                                    }
                                                    key={index}>
                                                    <div id={styles.image_div}>
                                                        <img
                                                            src={
                                                                item.productData
                                                                    .imageURL1
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.product_details
                                                        }
                                                        id={
                                                            styles.product_details
                                                        }>
                                                        <h4>
                                                            {
                                                                item.productData
                                                                    .name
                                                            }
                                                        </h4>
                                                        <p
                                                            className={
                                                                styles.color
                                                            }>
                                                            Colour :{" "}
                                                            {
                                                                item.productData
                                                                    .color
                                                            }
                                                        </p>
                                                        <p
                                                            className={
                                                                styles.color
                                                            }>
                                                            In stock
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.price
                                                        }>
                                                        <h4>Price</h4>
                                                        <p>
                                                            Rs{" "}
                                                            {
                                                                item.productData
                                                                    .price
                                                            }
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.quantity
                                                        }>
                                                        <h4>Quantity</h4>
                                                        <select
                                                            value={
                                                                item.quantity
                                                            }
                                                            onChange={
                                                                handleSelectChange
                                                            }
                                                            id={
                                                                item.productData
                                                                    ._id
                                                            }>
                                                            {options.map(
                                                                (option) => (
                                                                    <option
                                                                        key={
                                                                            option.value
                                                                        }
                                                                        value={
                                                                            option.value
                                                                        }>
                                                                        {
                                                                            option.label
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.total
                                                        }>
                                                        <h4>Total</h4>
                                                        <p>
                                                            Rs{" "}
                                                            {item.productData
                                                                .price *
                                                                item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className={styles.totalitem}>
                                        <p>{data?.length} item</p>
                                        <p>Rs {total}</p>
                                    </div>
                                </div>
                                <div className={styles.placeorder_box}>
                                    <p>
                                        <b>PRICE DETAILS</b>
                                    </p>
                                    <div className={styles.mrp_box}>
                                        <div>
                                            <p>Total MRP</p>
                                            <p>Rs {total}</p>
                                        </div>
                                        <div>
                                            <p>Discount on MRP</p>
                                            <p>Rs 0</p>
                                        </div>
                                        <div>
                                            <p>Convenience Fee</p>
                                            <p>Rs 45</p>
                                        </div>
                                    </div>
                                    <div
                                        className={styles.totalamount}
                                        id={styles.totalamount}>
                                        <h4>Total Amount</h4>
                                        <p>Rs {total + 45}</p>
                                    </div>
                                    <button
                                        onClick={() => navigate("/checkout")}
                                        className={styles.place_btn}>
                                        PLACE ORDER
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className={styles.cart_container_mobile}>
                    <button
                        onClick={() => navigate("/")}
                        className={styles.back_btn_mobile}>
                        <FaArrowLeftLong className={styles.small_icon} />
                    </button>
                    {data !== undefined ? (
                        <div className={styles.product_box_mobile}>
                            {data?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={
                                            styles.individual_product_mobile
                                        }>
                                        <img src={item.productData.imageURL1} />
                                        <div
                                            className={
                                                styles.content_box_mobile
                                            }>
                                            <p className={styles.name_mobile}>
                                                {item.productData.name}
                                            </p>
                                            <h3>Rs {item.productData.price}</h3>
                                            <p>
                                                Color : {item.productData.color}
                                            </p>
                                            <p>In stock</p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className={styles.lastline_mobile}>
                                <p>
                                    Convenience Fee &nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rs 45
                                </p>
                                <p className={styles.name_mobile}>
                                    Total :&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                    <b>Rs {total} </b>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    {data !== undefined ? (
                        <hr className={styles.line_mobile} />
                    ) : (
                        <></>
                    )}

                    {data !== undefined ? (
                        <p className={styles.total_mobile}>
                            Total Amount <b>Rs {total + 45}</b>
                        </p>
                    ) : (
                        <></>
                    )}
                    {data !== undefined ? (
                        <button
                            onClick={() => navigate("/checkout")}
                            className={styles.place_btn_mobile}>
                            PLACE ORDER
                        </button>
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

export default Cart;
