import axios from "axios";

const backendUrl = process.env.BACKEND_URI;

export const registerUser = async ({ name, mobile, email, password }) => {
    try {
        const reqUrl = `${backendUrl}/register`;
        const reqPayload = { name, mobile, email, password };
        const response = await axios.post(reqUrl, reqPayload);
        return response.data;
    } catch (error) {
        return;
    }
};

export const loginUser = async ({ emailORmobile, password }) => {
    try {
        const reqUrl = `${backendUrl}/login`;
        const reqPayload = { emailORmobile, password };
        const response = await axios.post(reqUrl, reqPayload);
        return response.data;
    } catch (error) {
        return;
    }
};