import { Link } from "react-router-dom";
import CartIcon from "../icons/CartIcon";
import gravatarUrl from "gravatar-url";
import { convertDate } from "../utils/convertDate";

interface SUProps {
    user: any;
    reloadUsers: any;
}

const SingleUser: React.FC<SUProps> = ({ user }) => {
    return (
        <div className="singleUserCard">
            <div className="imageDiv">
                <img
                    src={`${gravatarUrl(`${user.email}`, { size: 200 })}`}
                    alt={user.email}
                />
            </div>
            <div className="contentDiv">
                <h4>{user.email}</h4>
            </div>
            <div className="footerDiv">
                <span className="textSpan">
                    {convertDate(user.doj, "ddmmyy")}
                </span>
                <Link className="iconSpan" to={`/users/${user.customID}`}>
                    <CartIcon />
                </Link>
            </div>
        </div>
    );
};

export default SingleUser;
