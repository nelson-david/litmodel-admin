import { useEffect, useState } from "react";

const SingleEditPCL: React.FC<{
    pcl: number;
    lengthRef: any;
    priceRef: any;
    colorRef: any;
    pcLObject: any;
    pcLColors: any;
    pclIndex: number;
}> = ({
    pcl,
    lengthRef,
    priceRef,
    colorRef,
    pcLObject,
    pcLColors,
    pclIndex,
}) => {
    const [pAndLArray, setPANDLArray] = useState([0]);
    const [copyPCLObject, setCopyPCLObject] = useState({});

    useEffect(() => {
        if (Number.isInteger(pcLObject)) {
            setCopyPCLObject({ "": { price: "", length: "" } });
            console.log("COPIED: ", copyPCLObject);
        }
    }, []);

    return (
        <div className="singlePCLDiv">
            <div className="row">
                <div className="col-xl-4">
                    <div className="pclInputDiv">
                        <label>Color</label>
                        <input
                            type="color"
                            required
                            className={`pclColor${pcl}`}
                            value={pcLColors ? pcLColors[pclIndex] : ""}
                            onChange={() => {}}
                            ref={colorRef}
                        />
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="row">
                        {Object.keys(pcLObject).map((key, index) => {
                            return (
                                <PandL
                                    pcl={pcl}
                                    pcLObject={pcLObject}
                                    pclKey={key}
                                    key={index}
                                    priceRef={priceRef}
                                    lengthRef={lengthRef}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            <button
                type="button"
                onClick={() => {
                    const newArray = [...pAndLArray, pAndLArray.length + 1 - 1];
                    setPANDLArray(newArray);
                }}
            >
                New Price & Length
            </button>
        </div>
    );
};

const PandL: React.FC<{
    pcl: number;
    priceRef: any;
    lengthRef: any;
    pcLObject: any;
    pclKey: any;
}> = ({ pcl, priceRef, lengthRef, pcLObject, pclKey }) => {
    return (
        <>
            <div className="col-xl-6">
                <div className="pclInputDiv">
                    <label>Price</label>
                    <input
                        type="tel"
                        required
                        className={`pclPrice${pcl}`}
                        ref={priceRef}
                        defaultValue={pcLObject[pclKey].price}
                    />
                </div>
            </div>
            <div className="col-xl-6">
                <div className="pclInputDiv">
                    <label>Length</label>
                    <input
                        type="tel"
                        required
                        className={`pclLength${pcl}`}
                        ref={lengthRef}
                        defaultValue={pcLObject[pclKey].length}
                    />
                </div>
            </div>
        </>
    );
};

export default SingleEditPCL;
