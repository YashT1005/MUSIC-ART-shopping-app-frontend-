import React, { useContext } from "react";
import styles from "./MobileFooter.module.css";
import { IoMdHome } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { IoReceipt } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { context } from "../../App";

const MobileFooter = () => {
    const contextData = useContext(context);
    const navigate = useNavigate();
    return (
        <div className={styles.mobilefooter}>
            <button
                onClick={() => {
                    navigate("/");
                }}>
                <IoMdHome className={styles.smallicon} />
                <p>Home</p>
            </button>
            <button
                onClick={() => {
                    navigate("/cart");
                }}>
                {contextData.loggedIn && (
                    <div className={styles.cartcount}>
                        <p>{contextData.overallQuantity}</p>
                    </div>
                )}
                <MdAddShoppingCart className={styles.smallicon} />
                <p>cart</p>
            </button>
            {contextData.loggedIn && (
                <button
                    onClick={() => {
                        navigate("/invoice");
                    }}>
                    <IoReceipt className={styles.smallicon} />
                    <p>Invoice</p>
                </button>
            )}
            <button
                onClick={() => {
                    navigate("/login");
                    localStorage.clear();
                }}>
                <IoMdPerson className={styles.smallicon} />
                {contextData.loggedIn === true ? <p>Logout</p> : <p>Login</p>}
            </button>
        </div>
    );
};

export default MobileFooter;
