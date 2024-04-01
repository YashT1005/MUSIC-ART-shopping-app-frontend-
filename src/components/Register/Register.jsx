import React, { useState } from "react";
import styles from "./Register.module.css";
import music_image from "../../assets/music.png";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apis/user";

const Register = () => {
    const navigate = useNavigate();
    const [existError, setExistError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!data.name || !data.email || !data.mobile || !data.password) {
            setExistError(true);
            setErrorMessage("Please fill all the credentials *");
            return;
        }
        const response = await registerUser({
            name: data.name,
            mobile: data.mobile,
            email: data.email,
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
                        Create Account<span>. Don't have an account?</span>
                    </p>
                    <div className={styles.input}>
                        <p>Your name</p>
                        <input
                            value={data.name}
                            name="name"
                            onChange={handleChange}
                            type="text"
                        />
                    </div>
                    <div className={styles.input}>
                        <p>Mobile number</p>
                        <input
                            value={data.mobile}
                            name="mobile"
                            onChange={handleChange}
                            type="number"
                        />
                    </div>
                    <div className={styles.input}>
                        <p>Email id</p>
                        <input
                            value={data.email}
                            name="email"
                            onChange={handleChange}
                            type="email"
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

                    <p className={styles.enrolling}>
                        By enrolling your mobile phone number, you consent to
                        receive automated security notifications via text
                        message from Musicart. Message and data rates may apply
                    </p>

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
                <div className={styles.mobileview_navigate}>
                    <p>Already have an account? </p>
                    <a
                        href=""
                        onClick={() => navigate("/login")}>
                        Sign in
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
