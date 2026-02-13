import { useState } from "react";

const SinglePCL: React.FC<{
    pcl: number;
    lengthRef: any;
    priceRef: any;
    colorRef: any;
}> = ({ pcl, lengthRef, priceRef, colorRef }) => {
    const [pAndLArray, setPANDLArray] = useState([0]);
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
                            ref={colorRef}
                        />
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="row">
                        {pAndLArray.map((_, index) => {
                            return (
                                <PandL
                                    pcl={pcl}
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

const PandL: React.FC<{ pcl: number; priceRef: any; lengthRef: any }> = ({
    pcl,
    priceRef,
    lengthRef,
}) => {
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
                    />
                </div>
            </div>
        </>
    );
};

export default SinglePCL;
