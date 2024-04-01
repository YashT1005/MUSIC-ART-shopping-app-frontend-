import React from "react";
import styles from "./Successfull.module.css";
import Footer from "../Footer/Footer";
import music_image from "../../assets/music.png";
import hurray from "../../assets/hurray.png";
import MobileFooter from "../MobileFooter/MobileFooter";
import { useNavigate } from "react-router-dom";

const Successfull = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.main_container}>
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
                    </nav>
                </div>
                <div className={styles.hurray}>
                    <img src={hurray} />
                    <h3>Order is placed successfully</h3>
                    <p>
                        You will be receiving a confirmation email with order
                        details
                    </p>

                    <button onClick={() => navigate("/")}>
                        Go Back to the Home page
                    </button>
                </div>
            </div>
            <div className={styles.pcfooter}>
                <Footer />
            </div>
            <MobileFooter />
        </div>
    );
};

export default Successfull;
