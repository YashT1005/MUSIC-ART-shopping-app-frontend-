import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const Protected = ({ Component }) => {
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("MATOKEN");
        if (token) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, []);
    return <div>{isActive ? <Component /> : <Navigate to="/login" />}</div>;
};

export default Protected;
