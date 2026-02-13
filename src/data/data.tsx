import CategoryIcon from "../icons/CategoryIcon";
import DashboardIcon from "../icons/DashboardIcon";
import ProductIcon from "../icons/ProductIcon";
import SettingIcon from "../icons/SettingIcon";

export const sidebarList = [
    {
        name: "Dashboard",
        icon: <DashboardIcon />,
        link: "/",
    },
    {
        name: "Models",
        icon: <CategoryIcon />,
        link: "/models",
    },
    {
        name: "Scouted Models",
        icon: <ProductIcon />,
        link: "/scouted-models",
    },
    {
        name: "Newsletter",
        icon: <SettingIcon />,
        link: "/newsletter",
    },
];
