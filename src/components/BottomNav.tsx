import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { sidebarList } from "../data/data";

const BottomNav: React.FC<{}> = ({}) => {
    const pathname = window.location.pathname.split("/")[1];
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        setActiveTab(pathname);
    }, [pathname]);

    return (
        <div className="bottomNav">
            <ul>
                {sidebarList.map((ls, index) => {
                    return (
                        <li key={index}>
                            <Link
                                to={ls.link}
                                className={
                                    activeTab === ls.name.toLowerCase()
                                        ? "active"
                                        : ""
                                }
                                onClick={() => setActiveTab("")}
                            >
                                <span>{ls.icon}</span>
                                <i>{ls.name}</i>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default BottomNav;
