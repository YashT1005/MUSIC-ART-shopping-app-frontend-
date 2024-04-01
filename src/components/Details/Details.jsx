import React, { useContext, useEffect, useState } from "react";
import styles from "./Details.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { context } from "../../App";
import music_image from "../../assets/music.png";
import { IoCartOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import MobileFooter from "../MobileFooter/MobileFooter";
import { FaArrowLeftLong } from "react-icons/fa6";

import SwipeableViews from "react-swipeable-views";
import { createCart } from "../../apis/data";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function Details() {
    const navigate = useNavigate();
    const contextData = useContext(context);
    const { state } = useLocation();
    const [data, setData] = useState(state.data);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const imageUrls = [
        data.imageURL1,
        data.imageURL2,
        data.imageURL3,
        data.imageURL4,
    ];
    const [firstImage, setFirstImage] = useState(data?.imageURL1);
    const [restImages, setRestImages] = useState([
        data?.imageURL2,
        data?.imageURL3,
        data?.imageURL4
    ]);

    const handleImageClick = (restImage) => {
        const oldFirstImage = firstImage;
        setFirstImage(restImage);

        const restImageIndex = restImages.findIndex(image => image === restImage);
        const newRestImages = [...restImages];
        newRestImages.splice(restImageIndex, 1);
        newRestImages.push(oldFirstImage);
        setRestImages(newRestImages);
    };
    const handleChangeIndex = (index) => {
        setCurrentImageIndex(index);
    };
    const handleAddCart = async (e) => {
        const token = localStorage.getItem("MATOKEN")
        if (!token) {
            navigate('/login')
            return;
        }
        const response = await createCart({ id: e });
        if (response.success === false) {
            toast.info("Product limit exceeds!", { autoClose: 1000 });
            return;
        }
        if (response.success === true) {
            toast.info("Product added !", { autoClose: 1000 });
            contextData.fetchCartData();
            navigate('/cart')
        }
    };


    return (
        <div className={styles.main_container}>
            <ToastContainer />
            <Header logout={"showlogout"} />
            <div className={styles.container}>
                <div className={styles.navbar_container}>
                    <nav className={styles.navbar}>
                        <div className={styles.logo}>
                            <img src={music_image} />
                            <h2>Musicart</h2>
                        </div>
                        <p>Home / {data?.name}</p>
                    </nav>
                    {contextData.loggedIn && (
                        <div className={styles.login_navbar}>
                            <button
                                onClick={() => navigate("/cart")}
                                className={styles.viewcart_btn}>
                                <IoCartOutline className={styles.cart_icon} />
                                <p>View Cart</p>{" "}
                                <p>{contextData.overallQuantity}</p>
                            </button>
                        </div>
                    )}
                </div>
                <div className={styles.details_container}>
                    <button
                        onClick={() => navigate("/")}
                        className={styles.back_btn}>
                        Back to products
                    </button>

                    <h4 className={styles.description}>{data?.description}</h4>
                    <div className={styles.details_box}>
                        {/* <div className={styles.image_box}>
                            <div className={styles.first_image}>
                                <img
                                    src={data?.imageURL1}
                                    alt=""
                                />
                            </div>
                            <div className={styles.rest_images}>
                                <img
                                    src={data?.imageURL2}
                                    alt=""
                                />
                                <img
                                    src={data?.imageURL3}
                                    alt=""
                                />
                                <img
                                    src={data?.imageURL4}
                                    alt=""
                                />
                            </div>
                        </div> */}
                        <div className={styles.image_box}>
                            <div className={styles.first_image}>
                                <img
                                    src={firstImage}
                                    alt=""
                                />
                            </div>
                            <div className={styles.rest_images}>
                                {restImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt=""
                                        onClick={() => handleImageClick(image)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={styles.content_box}>
                            <h2>{data?.name}</h2>
                            <div className={styles.rating_box}>
                                <FaStar className={styles.star} />
                                <FaStar className={styles.star} />
                                <FaStar className={styles.star} />
                                <FaStar className={styles.star} />
                                <FaStar className={styles.star} />
                                <p>(50 Customer reviews)</p>
                            </div>
                            <h3>Price - Rs {data?.price}</h3>
                            <p className={styles.color}>
                                {data?.color} | {data?.type}
                            </p>
                            <p className={styles.about_text}>About this item</p>
                            <ul className={styles.about}>
                                {data?.about.map((item) => {
                                    return <li>{item}</li>;
                                })}
                            </ul>
                            <p className={styles.available}>
                                <b>Available - </b>In stock
                            </p>
                            <p className={styles.available}>
                                <b>Brand - </b>
                                {data?.brand}
                            </p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddCart(data?._id);
                                }}
                                id={data?._id}
                                className={styles.addtocart}>
                                Add to cart
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddCart(data?._id);
                                }}
                                className={styles.buynow}>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.details_container_mobile}>
                    <button
                        onClick={() => navigate("/")}
                        className={styles.back_btn_mobile}>
                        <FaArrowLeftLong className={styles.small_icon} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddCart(data?._id);
                        }}
                        className={styles.buynow_mobile}>
                        Buy Now
                    </button>
                    <div className={styles.image_carousel_container}>
                        <div
                            className={styles.image_carousel}
                            style={{
                                position: "relative",
                                width: "100%",
                            }}>
                            <SwipeableViews
                                index={currentImageIndex}
                                onChangeIndex={handleChangeIndex}>
                                {imageUrls.map((imageUrl, index) => (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        alt={`Image ${index}`}
                                    />
                                ))}
                            </SwipeableViews>
                        </div>
                        <div className={styles.image_indicators}>
                            {imageUrls.map((_, index) => (
                                <div
                                    key={index}
                                    className={`${styles.image_indicator} ${index === currentImageIndex
                                        ? `${styles.active}`
                                        : ""
                                        }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={styles.content_box_mobile}>
                        <h2>{data?.name}</h2>
                        <div className={styles.rating_box}>
                            <FaStar className={styles.star} />
                            <FaStar className={styles.star} />
                            <FaStar className={styles.star} />
                            <FaStar className={styles.star} />
                            <FaStar className={styles.star} />
                            <p>(50 Customer reviews)</p>
                        </div>
                        <p className={styles.description_mobile}>
                            {data?.description}
                        </p>
                        <p className={styles.color_mobile}>
                            {data?.color} | {data?.type}
                        </p>
                        <p className={styles.about_text}>About this item</p>
                        <ul className={styles.about}>
                            {data?.about.map((item) => {
                                return <li>{item}</li>;
                            })}
                        </ul>
                        <p className={styles.available_mobile}>
                            <b>Available - </b>In stock
                        </p>
                        <p className={styles.available_mobile}>
                            <b>Brand - </b>
                            {data?.brand}
                        </p>
                        <div className={styles.btn_mobile}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddCart(data?._id);
                                }}
                                className={styles.addtocart_mobile}>
                                Add to cart
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddCart(data?._id);
                                }}
                                className={styles.buynow_mobile}>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <MobileFooter />
        </div>
    );
}

export default Details;
