import React, { useContext, useEffect, useState } from "react";
import { context } from "../../App";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Home.module.css";
import MobileFooter from "../MobileFooter/MobileFooter";
import music_image from "../../assets/music.png";
import girl_image from "../../assets/girlimage.png";
import { CiSearch } from "react-icons/ci";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { createCart, getData } from "../../apis/data";
import { MdAddShoppingCart } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import Feedback from "../Feedback/Feedback";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
    const navigate = useNavigate();

    const contextData = useContext(context);

    const [logout, setLogout] = useState(false);

    const [nameSearch, setNameSearch] = useState("");
    const [typeSearch, setTypeSearch] = useState("");
    const [companySearch, setCompanySearch] = useState("");
    const [colorSeacrh, setColorSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortSearch, setSortSearch] = useState("");
    const [data, setData] = useState([]);
    const [display, setDisplay] = useState("grid");

    useEffect(() => {
        contextData.fetchCartData();
    }, []);

    useEffect(() => {
        contextData.setToken(localStorage.getItem("MATOKEN"));
        if (contextData.token) {
            contextData.setLoggedIn(true);
            contextData.setName(localStorage.getItem("MAUSERNAME"));
            contextData.fetchCartData();
        } else {
            contextData.setLoggedIn(false);
        }
    }, [contextData.token, contextData.overallQuantity]);
    useEffect(() => {
        fetchData();
    }, [
        nameSearch,
        typeSearch,
        companySearch,
        colorSeacrh,
        minPrice,
        maxPrice,
        sortSearch,
    ]);

    const fetchData = async () => {
        const response = await getData(
            nameSearch,
            typeSearch,
            companySearch,
            colorSeacrh,
            minPrice,
            maxPrice,
            sortSearch
        );
        setData(response.data);
    };

    const handleSearch = (e) => {
        setNameSearch(e.target.value);
    };

    const handleTypeChange = (e) => {
        setTypeSearch(e.target.value);
    };
    const handleCompanyChange = (e) => {
        setCompanySearch(e.target.value);
    };
    const handleColorChange = (e) => {
        setColorSearch(e.target.value);
    };

    const handlePriceChange = (e) => {
        if (e.target.value === "1000") {
            setMinPrice("0");
            setMaxPrice("1000");
        }
        if (e.target.value === "10000") {
            setMinPrice("1000");
            setMaxPrice("10000");
        }
        if (e.target.value === "20000") {
            setMinPrice("10000");
            setMaxPrice("20000");
        }
    };

    const handleSortChange = (e) => {
        setSortSearch(e.target.value);
    };

    const handleAddCart = async (e) => {
        const response = await createCart({ id: e });
        if (response.success === false) {
            toast.info("Product quantity increased!", { autoClose: 1000 });
            return;
        }
        if (response.success === true) {
        }
        contextData.fetchCartData();
    };

    return (
        <>
            <ToastContainer />
            <div className={styles.main_container}>
                <div className={styles.pcheader}>
                    <Header
                        setNameSearch={setNameSearch}
                        nameSearch={nameSearch}
                    />
                </div>
                <div className={styles.container}>
                    <div className={styles.navbar_container}>
                        <nav className={styles.navbar}>
                            <div className={styles.logo}>
                                <img
                                    src={music_image}
                                    alt=""
                                />
                                <h2>Musicart</h2>
                            </div>
                            <p>Home</p>
                            {contextData.loggedIn && (
                                <p
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate("/invoice")}>
                                    Invoice
                                </p>
                            )}
                        </nav>
                        {contextData.loggedIn && (
                            <div className={styles.login_navbar}>
                                <button
                                    onClick={() => navigate("/cart")}
                                    className={styles.viewcart_btn}>
                                    <IoCartOutline
                                        className={styles.cart_icon}
                                    />
                                    <p>View Cart</p>{" "}
                                    <p>{contextData.overallQuantity}</p>
                                </button>
                                <div className={styles.name_container}>
                                    <button
                                        onClick={() => setLogout(!logout)}
                                        className={styles.name_short}>
                                        <p>
                                            {contextData.name?.charAt(0)}
                                            {contextData.name?.charAt(
                                                contextData.name.lastIndexOf(
                                                    " "
                                                ) + 1
                                            )}
                                        </p>
                                    </button>
                                    {logout && (
                                        <div className={styles.logout_box}>
                                            <p>{contextData.name}</p>
                                            <hr />
                                            <p
                                                className={styles.logout_text}
                                                onClick={() => {
                                                    navigate("/login");
                                                    localStorage.clear();
                                                }}>
                                                Logout
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.rectangle_container}>
                        <div className={styles.leftcontent}>
                            <p>
                                Grab upto 50% off on <br /> Selected headphones
                            </p>
                            <div>Buy Now</div>
                        </div>
                        <img
                            src={girl_image}
                            alt=""
                        />
                    </div>
                    <div className={styles.search}>
                        <CiSearch />
                        <input
                            value={nameSearch}
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search by Product name"
                        />
                    </div>
                    <div className={styles.filter_container}>
                        <div className={styles.smallicon_button}>
                            <button onClick={() => setDisplay("grid")}>
                                <IoGrid className={styles.smallicon} />
                            </button>
                            <button onClick={() => setDisplay("list")}>
                                <FaList className={styles.smallicon} />
                            </button>
                        </div>
                        <div className={styles.left_sort}>
                            <select
                                onChange={handleSortChange}
                                className={styles.mobile_sort}>
                                <option
                                    value=""
                                    selected
                                    disabled>
                                    Sort By
                                </option>
                                <option value="priceAsc">Price : Lowest</option>
                                <option value="priceDesc">
                                    Price : Highest
                                </option>
                                <option value="nameAsc">Name : (A-Z)</option>
                                <option value="nameDesc">Name : (Z-A)</option>
                                <option value="">Default</option>
                            </select>
                            <select
                                onChange={handleTypeChange}
                                className={styles.dropdown_menu}>
                                <option
                                    value=""
                                    selected
                                    disabled>
                                    Select Headphone Type
                                </option>
                                <option value="in-ear">In-ear headphone</option>
                                <option value="on-ear">On-ear headphone</option>
                                <option value="over-ear">
                                    Over-ear headphone
                                </option>
                                <option value="">All</option>
                            </select>
                            <select
                                onChange={handleCompanyChange}
                                className={styles.dropdown_menu}>
                                <option
                                    value=""
                                    selected
                                    disabled>
                                    Company
                                </option>
                                <option value="jbl">JBL</option>
                                <option value="sony">Sony</option>
                                <option value="boat">Boat</option>
                                <option value="zebronics">Zebronics</option>
                                <option value="marshall">Marshall</option>
                                <option value="ptron">Ptron</option>
                                <option value="boult">Boult</option>
                                <option value="">All</option>
                            </select>
                            <select
                                onChange={handleColorChange}
                                className={styles.dropdown_menu}>
                                <option
                                    value=""
                                    selected
                                    disabled>
                                    Color
                                </option>
                                <option value="blue">Blue</option>
                                <option value="black">Black</option>
                                <option value="white">White</option>
                                <option value="brown">Brown</option>
                                <option value="">All</option>
                            </select>
                            <select
                                onChange={handlePriceChange}
                                className={styles.dropdown_menu}>
                                <option
                                    value=""
                                    selected
                                    disabled>
                                    Price
                                </option>
                                <option value="1000">0-1000</option>
                                <option value="10000">1000-10000</option>
                                <option value="20000">10000-20000</option>
                                <option value="">All</option>
                            </select>
                        </div>
                        <div className={styles.right_sort}>
                            <select onChange={handleSortChange}>
                                <option
                                    value=""
                                    selected
                                    disabled>
                                    Sort By : Featured
                                </option>
                                <option value="priceAsc">Price : Lowest</option>
                                <option value="priceDesc">
                                    Price : Highest
                                </option>
                                <option value="nameAsc">Name : (A-Z)</option>
                                <option value="nameDesc">Name : (Z-A)</option>
                                <option value="">Default</option>
                            </select>
                        </div>
                    </div>
                    {display === "grid" ? (
                        <div className={styles.product_container}>
                            {data.map((item) => {
                                return (
                                    <div className={styles.product}>
                                        <div
                                            onClick={() => {
                                                navigate("/details", {
                                                    state: {
                                                        id: item._id,
                                                        data: item,
                                                    },
                                                });
                                            }}
                                            className={styles.image_box}>
                                            <img
                                                src={item.imageURL1}
                                                alt=""
                                            />
                                            {contextData.loggedIn && (
                                                <button
                                                    onClick={(e) => {
                                                        // Stop event propagation to avoid navigation
                                                        e.stopPropagation();
                                                        handleAddCart(item._id);
                                                    }}
                                                    id={item._id}>
                                                    <MdAddShoppingCart
                                                        className={
                                                            styles.addtocart
                                                        }
                                                    />
                                                </button>
                                            )}
                                        </div>
                                        <div className={styles.details_box}>
                                            <p>{item.name}</p>
                                            <p>Price - Rs {item.price}</p>
                                            <p>
                                                {item.color} | {item.type}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <></>
                    )}
                    {display === "list" ? (
                        <div className={styles.list_product_container}>
                            {data.map((item) => {
                                return (
                                    <div className={styles.list_product}>
                                        <div className={styles.list_image_box}>
                                            <img
                                                src={item.imageURL1}
                                                alt=""
                                            />
                                            {contextData.loggedIn && (
                                                <button
                                                    onClick={(e) => {
                                                        // Stop event propagation to avoid navigation
                                                        e.stopPropagation();
                                                        handleAddCart(item._id);
                                                    }}
                                                    id={item._id}>
                                                    <MdAddShoppingCart
                                                        className={
                                                            styles.addtocart
                                                        }
                                                    />
                                                </button>
                                            )}
                                        </div>
                                        <div
                                            className={styles.list_details_box}>
                                            <h2>{item.name}</h2>
                                            <p>Price - Rs {item.price}</p>
                                            <p>
                                                {item.color} | {item.type}
                                            </p>
                                            <p>{item.description}</p>
                                            <button
                                                onClick={() => {
                                                    navigate("/details", {
                                                        state: {
                                                            id: item._id,
                                                            data: item,
                                                        },
                                                    });
                                                }}>
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className={styles.pcfooter}>
                    <Footer className={styles.footer} />
                </div>
            </div>
            {contextData.loggedIn && (
                <div className={styles.feedback}>
                    <Feedback />
                </div>
            )}

            <div className={styles.mobilefooter}>
                <MobileFooter />
            </div>
        </>
    );
};

export default Home;
