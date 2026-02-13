import { ImSpinner8 } from "react-icons/im";

const Loader = () => {
    return (
        <div
            className="urlLoader"
            style={{
                height: "250px",
            }}
        >
            <p
                style={{
                    fontSize: "23px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    margin: "0px",
                }}
            >
                <span className="spin">
                    <ImSpinner8 />
                </span>
            </p>
        </div>
    );
};

export default Loader;
