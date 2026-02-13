import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { errorToast } from "../config";

const AuthModal: React.FC<{ setToken: any }> = ({ setToken }) => {
    const [accessCode, setAccessCode] = useState("");
    const [processing, _] = useState(false);

    const loginAdmin = () => {
        if (accessCode === "1234") {
            setToken("dummytoken", {
                username: "admin",
                name: "Ifyposh Admin",
            });
        } else {
            errorToast("Invalid access code");
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed-top customBackdrop authModalBackdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="customModal authModal"
                >
                    <div className="modalContent">
                        <form onSubmit={loginAdmin}>
                            <div className="form-group">
                                <label>Enter Admin access code</label>
                                <input
                                    type="text"
                                    required
                                    className="form-control customInput"
                                    value={accessCode}
                                    onChange={(e) =>
                                        setAccessCode(e.target.value)
                                    }
                                />
                            </div>
                            <div className="authButtonDiv">
                                <button
                                    type="submit"
                                    className="spin"
                                    disabled={processing}
                                >
                                    {processing ? <ImSpinner8 /> : "Proceed"}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AuthModal;
