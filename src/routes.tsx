import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import Dashboard from "./pages/Dashboard";
import Newsletter from "./pages/Newsletter";
// import AuthToken from "./auth/authToken";
// import AuthModal from "./auth/AuthModal";
import { useEffect, useState, useCallback } from "react";
import { ADMIN_TOKEN, API_URL } from "./config";
import axios from "axios";
import Models from "./pages/Models";
import AddModel from "./pages/AddModel";
import { useAtom } from "jotai";
import { allModels, allScoutedModels } from "./utils/jotaiAtom";
import EditModel from "./pages/EditModel";
import ScoutedModels from "./pages/ScoutedModels";

export const Router = () => {
    //const { token, setToken } = AuthToken();
    const [loading, setLoading] = useState(true);
    const [_, setModels] = useAtom(allModels);
    const [__, setScoutedModels] = useAtom(allScoutedModels);

    const fetchAndReloadModels = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/model/all/`, {
                headers: { "x-auth-token": ADMIN_TOKEN },
            });
            setModels(response.data.data);
            setLoading(false);
            return "success";
        } catch {
            return "error";
        }
    }, [setModels]);

    const fetchAndReloadScoutedModels = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/scouted-model/all/`, {
                headers: { "x-auth-token": ADMIN_TOKEN },
            });
            setScoutedModels(response.data.data);
            setLoading(false);
            return "success";
        } catch {
            return "error";
        }
    }, [setScoutedModels]);

    useEffect(() => {
        fetchAndReloadModels();
        fetchAndReloadScoutedModels();
    }, [fetchAndReloadModels, fetchAndReloadScoutedModels]);

    return (
        <>
            <ToastContainer />
            <HelmetProvider>
                <Routes>
                    <Route path="/" element={<Dashboard loading={loading} />} />
                    <Route path="/newsletter" element={<Newsletter />} />
                    <Route
                        path="/models"
                        element={
                            <Models
                                loading={loading}
                                reloadModels={fetchAndReloadModels}
                            />
                        }
                    />
                    <Route
                        path="/scouted-models"
                        element={
                            <ScoutedModels
                                loading={loading}
                                reloadModels={fetchAndReloadScoutedModels}
                            />
                        }
                    />
                    <Route
                        path="/models/new"
                        element={
                            <AddModel
                                fetchAndReloadModels={fetchAndReloadModels}
                            />
                        }
                    />
                    <Route
                        path="/models/:id/edit"
                        element={
                            <EditModel
                                fetchAndReloadModels={fetchAndReloadModels}
                                loading={loading}
                            />
                        }
                    />
                </Routes>
            </HelmetProvider>
        </>
    );
};
