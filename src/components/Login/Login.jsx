import React, { useState } from "react";
import styles from "./Login.module.css";
import music_image from "../../assets/music.png";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../apis/user";

const Login = () => {
    const navigate = useNavigate();
    const [existError, setExistError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState({
        emailORmobile: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!data.emailORmobile || !data.password) {
            setExistError(true);
            setErrorMessage("Please fill all the credentials *");
            return;
        }
        const response = await loginUser({
            emailORmobile: data.emailORmobile,
            password: data.password,
        });


        if (response.success === false) {
            setExistError(true);
            setErrorMessage(response.message);
            return;
        }
        if (response.success === true) {
            localStorage.setItem("MATOKEN", response.token);
            localStorage.setItem("MAUSERNAME", response.name);
            navigate("/");
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.login_container}>
                <div className={styles.logo}>
                    <img src={music_image} />
                    <p className={styles.logo_heading}>Musicart</p>
                </div>
                <p className={styles.welcome}>Welcome</p>
                <div className={styles.form_container}>
                    <p className={styles.bigfont}>
                        Sign in<span>. Already a customer?</span>
                    </p>
                    <div className={styles.input}>
                        <p>Enter your email or mobile number</p>
                        <input
                            value={data.emailORmobile}
                            name="emailORmobile"
                            onChange={handleChange}
                            type="text"
                        />
                    </div>
                    <div className={styles.input}>
                        <p>Password</p>
                        <input
                            value={data.password}
                            name="password"
                            onChange={handleChange}
                            type="password"
                        />
                    </div>
                    {existError && (
                        <p className={styles.error}>{errorMessage}</p>
                    )}
                    <button
                        onClick={handleSubmit}
                        className={styles.continue_btn}>
                        Continue
                    </button>
                    <p className={styles.agreement}>
                        By continuing, you agree to Musicart privacy notice and
                        conditions of use.
                    </p>
                </div>
                <div className={styles.new}>
                    <div className={styles.line} />
                    <div className={styles.text}>New to Musicart?</div>
                    <div className={styles.line} />
                </div>
                <button
                    className={styles.navigate_btn}
                    onClick={() => navigate("/register")}>
                    Create your musicart account
                </button>
            </div>
            <Footer className={styles.footer} />
        </div>
    );
};

export default Login;
