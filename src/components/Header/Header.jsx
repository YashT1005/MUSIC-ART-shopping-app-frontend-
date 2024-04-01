import React, { useContext, useEffect, useState } from "react";
import styles from "./Header.module.css";
import { BiPhoneCall } from "react-icons/bi";
import { CiRuler, CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { context } from "../../App";

const Header = ({ setNameSearch, nameSearch, logout }) => {
    const [log, setLog] = useState(logout);
    const contextData = useContext(context);
    const navigate = useNavigate();
    const handleSearch = (e) => {
        setNameSearch(e.target.value);
    };

    return (
        <div className={styles.header_container}>
            <div className={styles.pcheader}>
                <div className={styles.call}>
                    <BiPhoneCall />
                    <p>912121131313</p>
                </div>
                <p>Get 50% off on selected items | Shop now</p>
                {contextData.loggedIn === false ? (
                    <p>
                        <button
                            onClick={() => navigate("/login")}
                            className={styles.login}>
                            Login
                        </button>{" "}
                        |{" "}
                        <button
                            onClick={() => navigate("/register")}
                            className={styles.login}>
                            Signup
                        </button>
                    </p>
                ) : (
                    <div>
                        {contextData.loggedIn === true &&
                            log === "showlogout" ? (
                            <div
                                onClick={() => {
                                    localStorage.clear();
                                    navigate("/login");
                                }}
                                style={{ cursor: "pointer" }}>
                                Logout
                            </div>
                        ) : (
                            <div className={styles.hidden}></div>
                        )}
                    </div>
                )}
            </div>
            <div className={styles.mobileheader}>
                <div className={styles.search}>
                    <CiSearch className={styles.searchicon} />
                    <input
                        value={nameSearch}
                        onChange={handleSearch}
                        type="text"
                        placeholder="Search Musicart"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
