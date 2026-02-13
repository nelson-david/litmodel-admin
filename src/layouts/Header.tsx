import { Helmet } from "react-helmet-async";

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <Helmet>
            <title>Lit Model - {title ? title : "Management"}</title>
        </Helmet>
    );
};

export default Header;
