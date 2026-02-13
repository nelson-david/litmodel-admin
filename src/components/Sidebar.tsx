import { Link } from "react-router-dom";
import { sidebarList } from "../data/data";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const [activePage, setActivePage] = useState("/");

    const pathname = window.location.pathname;
    useEffect(() => {
        setActivePage(pathname);
    }, [pathname]);

    return (
        <aside className="customSidebar">
            <ul>
                {sidebarList.map((action, index) => {
                    return (
                        <li
                            key={index}
                            className={
                                activePage === action.link ? "active" : ""
                            }
                        >
                            <Link to={action.link}>
                                <span className="iconSpan">{action.icon}</span>
                                <i>{action.name}</i>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;
