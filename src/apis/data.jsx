import axios from "axios";

const backendUrl = process.env.BACKEND_URI;

export const getData = async (name, type, brand, color, minPrice, maxPrice, sortType) => {
    try {
        const reqUrl = `${backendUrl}/getData?name=${name}&type=${type}&brand=${brand}&color=${color}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortType=${sortType}`;
        // console.log(reqUrl)
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        return;
    }
};
export const getCartData = async () => {
    try {
        const reqUrl = `${backendUrl}/getCartData`;
        const token = localStorage.getItem("MATOKEN");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        return;
    }
};
export const createCart = async ({ id }) => {
    try {
        const reqUrl = `${backendUrl}/create`;
        const token = localStorage.getItem("MATOKEN");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(reqUrl, { id });
        return response.data;
    } catch (error) {
        return;
    }
};
export const modifyQuantity = async ({ id, quantity }) => {
    try {
        const reqUrl = `${backendUrl}/modifyQuantity`;
        const token = localStorage.getItem("MATOKEN");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl, { id, quantity });
        return response.data;
    } catch (error) {
        return;
    }
};
export const createInvoice = async ({ data, address, mode }) => {
    try {
        const reqUrl = `${backendUrl}/createInvoice`;
        const token = localStorage.getItem("MATOKEN");
        const reqPayload = { data, address, mode };
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(reqUrl, reqPayload);
        return response.data;
    } catch (error) {
        return;
    }
};
export const deleteCart = async () => {
    try {
        const reqUrl = `${backendUrl}/deleteCart`;
        const token = localStorage.getItem("MATOKEN");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.delete(reqUrl);
        return response.data;
    } catch (error) {
        return;
    }
};
export const getInvoice = async () => {
    try {
        const reqUrl = `${backendUrl}/getInvoice`;
        const token = localStorage.getItem("MATOKEN");
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        return;
    }
};
