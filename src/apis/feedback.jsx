import axios from "axios";

const backendUrl = process.env.BACKEND_URI;

export const postFeedback = async ({ type, message }) => {
    try {
        const reqUrl = `${backendUrl}/feedback`;
        const reqPayload = { type, message };
        const token = localStorage.getItem("MATOKEN");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(reqUrl, reqPayload);
        return response.data;
    } catch (error) {
        return;
    }
};