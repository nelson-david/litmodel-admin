import { useState } from "react";

export default function AuthToken() {
    const getToken = () => {
        const tokenString = window.localStorage.getItem("ifyposhAdmin_token");
        return tokenString;
    };

    const getAdmin = () => {
        const activeAdmin = window.localStorage.getItem("ifyposhAdmin_admin");
        return JSON.parse(String(activeAdmin));
    };

    const [token, setToken] = useState(getToken());
    const [admin, setAdmin] = useState(getAdmin());

    const saveToken = (adminToken: string, adminData: object) => {
        window.localStorage.setItem("ifyposhAdmin_token", adminToken);
        window.localStorage.setItem(
            "ifyposhAdmin_admin",
            JSON.stringify(adminData)
        );
        setToken(adminToken);
        setAdmin(getAdmin());
    };

    const deleteToken = () => {
        window.localStorage.removeItem("ifyposhAdmin_token");
        window.localStorage.removeItem("ifyposhAdmin_admin");
        setToken(getToken());
        setAdmin(getAdmin());
    };

    return {
        setToken: saveToken,
        removeToken: deleteToken,
        token,
        admin,
    };
}
