import BinIcon from "../icons/BinIcon";
import { convertDate } from "../utils/convertDate";
import { motion, useCycle } from "framer-motion";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import { ADMIN_TOKEN, API_URL, errorToast, successToast } from "../config";
import axios from "axios";
import Carousel from "./Carousel";
import { ImPencil } from "react-icons/im";
import { Link } from "react-router-dom";

interface SPProps {
    model: any;
    reloadModels: any;
}

const List = ({ list }: { list: any }) => {
    return (
        <>
            {list[0] !== "_id" && list[0] !== "images" ? (
                <li>
                    <strong>{list[0]}: </strong>
                    <span>{list[1]}</span>
                </li>
            ) : (
                <></>
            )}
        </>
    );
};

const SingleModel: React.FC<SPProps> = ({ model, reloadModels }) => {
    const [openModal, cycleOpenModal] = useCycle(false, true);
    const [processingDelete, setProcessingDelete] = useState(false);

    const deleteSingleModel = () => {
        setProcessingDelete(true);
        axios({
            method: "DELETE",
            url: `${API_URL}/model/${model._id}/delete/`,
            headers: {
                "x-auth-token": ADMIN_TOKEN,
            },
        })
            .then(() => {
                reloadModels().then((res: string) => {
                    setProcessingDelete(false);
                    if (res === "success") {
                        successToast("Model deleted");
                    } else {
                        errorToast("An error occured");
                    }
                    cycleOpenModal();
                });
            })
            .catch((error) => {
                errorToast(error.message);
                setProcessingDelete(false);
                cycleOpenModal();
            });
    };

    return (
        <div className="singleProductCard">
            <div className="imageDiv">
                <Carousel images={model.polaroid} />
            </div>
            <div className="contentDiv">
                <h4 style={{ marginTop: "10px" }}>{model.fullName}</h4>
                <p className="description">{model.shortDescription}</p>
                <h4 style={{ marginTop: "10px" }}>Measurements</h4>
                <ul>
                    {Object.entries(model.measurement).map((t: any, index) => {
                        return <List key={index} list={t} />;
                    })}
                </ul>
                <h4>Portfolio</h4>
                <ul>
                    {Object.entries(model.portfolio).map((t: any, index) => {
                        return <List key={index} list={t} />;
                    })}
                </ul>
                <h4>Others</h4>
                <ul>
                    <li>
                        <strong>New Face: </strong>
                        <span>{model.newFace ? "Yes" : "No"}</span>
                    </li>
                    <li>
                        <strong>Top Model: </strong>
                        <span>{model.topModel ? "Yes" : "No"}</span>
                    </li>
                </ul>
            </div>
            <div className="footerDiv">
                <span className="textSpan">
                    {convertDate(model.dateAdded, "ddmmyy")}
                </span>
                <motion.span
                    className="iconSpan"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => cycleOpenModal()}
                >
                    <Link to={`/models/${model._id}/edit`}>
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
                actionToTake={deleteSingleModel}
                processingDelete={processingDelete}
                deleteType="product"
            />
        </div>
    );
};

export default SingleModel;
