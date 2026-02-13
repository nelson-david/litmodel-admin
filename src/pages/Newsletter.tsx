import PageLayout from "../layouts/PageLayout";
import { useEffect, useState } from "react";
import { ADMIN_TOKEN, API_URL } from "../config";
import axios from "axios";

const Newsletter = () => {
    const [subscriberList, setSubscriberList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAndReloadSubscribers = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/get/`, {
                headers: { "x-auth-token": ADMIN_TOKEN },
            });
            console.log("RESPONSE: ", response);
            setSubscriberList(response.data.data);
            setLoading(false);
            return "success";
        } catch {
            return "error";
        }
    };

    useEffect(() => {
        fetchAndReloadSubscribers();
    }, []);
    return (
        <PageLayout>
            <section className="userSection">
                <div className="userList">
                    {loading ? (
                        <h1>Loading Subscribers...</h1>
                    ) : (
                        <div className="row">
                            {subscriberList.map((user: any) => {
                                return (
                                    <div
                                        className="col-xl-4"
                                        key={user._id}
                                    ></div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </PageLayout>
    );
};

export default Newsletter;
