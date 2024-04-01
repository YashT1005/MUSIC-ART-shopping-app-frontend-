import React, { useState } from "react";
import { VscFeedback } from "react-icons/vsc";
import styles from "./Feedback.module.css";
import { postFeedback } from "../../apis/feedback";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function Feedback() {
    const [isFeedback, setIsFeedback] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState({
        type: "",
        message: "",
    });
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitFeedback = async () => {
        if (data.type == "" || data.message == "") {
            setError(true);
            return;
        }
        const response = await postFeedback({
            type: data.type,
            message: data.message,
        });
        if (response) {
            toast.info("Feedback Submitted!", { autoClose: 2000 });
            setIsFeedback(false);
            setData({ type: "", message: "" })
        }
    };
    return (
        <div className={styles.container}>
            {isFeedback && (
                <div className={styles.content_box}>
                    <div>
                        <p>Type of feedback</p>
                        <select
                            style={{
                                border: `${error === true ? "2px solid red" : ""
                                    }`,
                            }}
                            onChange={handleChange}
                            name="type">
                            <option
                                value=""
                                selected
                                disabled>
                                Choose the type
                            </option>
                            <option value="bugs">Bugs</option>
                            <option value="feedback">Feedback</option>
                            <option value="query">Query</option>
                        </select>
                    </div>
                    <div>
                        <p>Feedback</p>
                        <textarea
                            style={{
                                border: `${error === true ? "2px solid red" : ""
                                    }`,
                            }}
                            onChange={handleChange}
                            value={data.message}
                            name="message"
                            type="text"
                            placeholder="Type your Feedback"
                        />
                    </div>
                    <button
                        onClick={submitFeedback}
                        className={styles.submit_btn}>
                        Submit
                    </button>

                </div>
            )}

            <button
                onClick={() => setIsFeedback(!isFeedback)}
                className={styles.feedback_btn}>
                <VscFeedback className={styles.feedback_icon} />
            </button>
            <ToastContainer />
        </div>
    );
}

export default Feedback;
