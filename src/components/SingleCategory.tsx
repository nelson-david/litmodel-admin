import BinIcon from "../icons/BinIcon";
import { convertDate } from "../utils/convertDate";
import { motion, useCycle } from "framer-motion";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import axios from "axios";
import { ADMIN_TOKEN, API_URL, errorToast, successToast } from "../config";
import { Link } from "react-router-dom";
import { ImPencil } from "react-icons/im";

interface SCProps {
    category: any;
    reloadCategories: any;
}

const SingleCategory: React.FC<SCProps> = ({ category, reloadCategories }) => {
    const [openModal, cycleOpenModal] = useCycle(false, true);
    const [processingDelete, setProcessingDelete] = useState(false);

    const deleteSingleCategory = () => {
        setProcessingDelete(true);

        axios({
            method: "DELETE",
            url: `${API_URL}/category/delete/${category._id}`,
            headers: {
                "x-auth-token": ADMIN_TOKEN,
            },
        })
            .then(() => {
                reloadCategories().then((res: string) => {
                    setProcessingDelete(false);
                    if (res === "success") {
                        successToast("Category deleted");
                    } else {
                        errorToast("An error occured");
                    }
                    cycleOpenModal();
                });
            })
            .catch((error: any) => {
                errorToast(error.message);
                setProcessingDelete(false);
                cycleOpenModal();
            });
    };

    return (
        <div className="singleCategoryCard">
            <div className="imageDiv">
                <img src={category.categoryImage} alt={category.title} />
            </div>
            <div className="contentDiv">
                <h4>
                    {category.title}{" "}
                    <span>{category.isPromo ? "promo" : ""}</span>
                </h4>
            </div>
            <div className="footerDiv">
                <span className="textSpan">
                    {convertDate(category.dateCreated, "ddmmyy")}
                </span>
                <motion.span
                    className="iconSpan withLink"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link to={`/categories/${category._id}/edit`}>
                        <ImPencil />
                    </Link>
                </motion.span>
                <motion.span
                    className="iconSpan"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => cycleOpenModal()}
                >
                    <BinIcon />
                </motion.span>
            </div>
            <DeleteModal
                openModal={openModal}
                cycleOpenModal={cycleOpenModal}
                actionToTake={deleteSingleCategory}
                processingDelete={processingDelete}
                deleteType="category"
            />
        </div>
    );
};

export default SingleCategory;
