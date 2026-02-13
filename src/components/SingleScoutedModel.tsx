import BinIcon from "../icons/BinIcon";
import { convertDate } from "../utils/convertDate";
import { motion, useCycle } from "framer-motion";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import { ADMIN_TOKEN, API_URL, errorToast, successToast } from "../config";
import axios from "axios";
import Carousel from "./Carousel";

interface SPProps {
    model: any;
    reloadModels: any;
}

const List = ({ list }: { list: any }) => {
    return (
        <>
            {list[0] !== "_id" ? (
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

const SingleScoutedModel: React.FC<SPProps> = ({ model, reloadModels }) => {
    const [openModal, cycleOpenModal] = useCycle(false, true);
    const [processingDelete, setProcessingDelete] = useState(false);

    console.log("MODEL: ", model);

    const deleteSingleScoutedModel = () => {
        setProcessingDelete(true);
        axios({
            method: "DELETE",
            url: `${API_URL}/scouted-model/delete/${model._id}`,
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
                <p className="description">
                    Email: <a href={`mailto:${model.email}`}>{model.email}</a>
                </p>
                <p className="description">
                    Date Of Birth:{" "}
                    <span>{convertDate(model.dateOfBirth, "fulldate")}</span>
                </p>
                <h4 style={{ marginTop: "10px" }}>Measurements</h4>
                <ul>
                    {Object.entries(model.measurement).map((t: any, index) => {
                        return <List key={index} list={t} />;
                    })}
                </ul>
                <h4>Contact</h4>
                <ul>
                    <li>
                        <strong>Instagram: </strong>
                        <span>{model.instagramHandle}</span>
                    </li>
                    <li>
                        <strong>Phone Number: </strong>
                        <span>{model.phoneNumber}</span>
                    </li>
                    <li style={{ width: "100%" }}>
                        <strong>Residential Address: </strong>
                        <span>{model.residentialAddress}</span>
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
                    <BinIcon />
                </motion.span>
            </div>
            <DeleteModal
                openModal={openModal}
                cycleOpenModal={cycleOpenModal}
                actionToTake={deleteSingleScoutedModel}
                processingDelete={processingDelete}
                deleteType="model"
            />
        </div>
    );
};

export default SingleScoutedModel;
