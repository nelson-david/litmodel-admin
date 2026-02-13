import { ImSpinner8 } from "react-icons/im";
import ImageUpload from "../components/ImageUpload";
import PageLayout from "../layouts/PageLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_TOKEN, API_URL, errorToast, successToast } from "../config";
import { Navigate } from "react-router-dom";

const AddModel = ({ fetchAndReloadModels }: { fetchAndReloadModels: any }) => {
    const [modelName, setModelName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [gender, setGender] = useState("");
    const [measurement, setMeasurement] = useState<any>({
        height: "",
        waist: "",
        eye: "",
        hip: "",
        dressSize: "",
        shoe: "",
        chestBust: "",
    });
    const [portfolio, setPortfolio] = useState<any>({
        instagram: "",
        other: "",
    });
    const [newFace, setNewFace] = useState(false);
    const [topModel, setTopModel] = useState(false);
    const [modelImages, setModelImages] = useState<string[]>([]);
    const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
    const [processing, setProcessing] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetchAndReloadModels();
    }, [fetchAndReloadModels]);

    const uploadModel = (e: any) => {
        e.preventDefault();
        setProcessing(true);

        const data = {
            headerImage: modelImages[0],
            fullName: modelName,
            shortDescription,
            measurement,
            portfolio: { ...portfolio, images: portfolioImages },
            polaroid: modelImages,
            newFace,
            topModel,
            gender,
        };

        axios({
            method: "POST",
            data: data,
            url: `${API_URL}/model/add/`,
            headers: {
                "x-auth-token": ADMIN_TOKEN,
            },
        })
            .then(() => {
                fetchAndReloadModels().then(() => {
                    setProcessing(false);
                    successToast("Model added");
                    setRedirect(true);
                });
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                setProcessing(false);
                errorToast(error.message);
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    return (
        <PageLayout>
            {redirect ? <Navigate to="/models" /> : ""}
            <div className="max-w-5xl p-16 mb-20 mx-auto bg-white border-[1.5px] border-black shadow-neo-lg">
                <div className="flex justify-between items-center mb-8 border-b pb-6">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-4xl font-light uppercase tracking-tighter">Add New Model</h1>
                        <p className="text-gray-500 font-medium">Register a fresh talent to the database.</p>
                    </div>
                    <div className="bg-lit-yellow shadow-neo border-2 border-black px-3 py-1 font-black text-xs shadow-neo-sm mt-auto">
                        STEP 1 OF 1
                    </div>
                </div>

                <form onSubmit={uploadModel} className="space-y-16">
                    {/* 01 GENERAL INFORMATION */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="bg-black text-white font-black text-sm px-2 py-1">01</span>
                            <h2 className="font-medium tracking-tight uppercase text-xl">General Information</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2" htmlFor="modelName">Model Name</label>
                                <input
                                    type="text"
                                    id="modelName"
                                    className="neo-input h-16 w-full"
                                    placeholder="e.g. Jane Doe"
                                    value={modelName}
                                    onChange={(e) => setModelName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2" htmlFor="shortDescription">Short Description</label>
                                <input
                                    type="text"
                                    id="shortDescription"
                                    className="neo-input h-16 w-full"
                                    placeholder="e.g. Editorial & High Fashion"
                                    value={shortDescription}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* 02 MODEL MEASUREMENTS */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="bg-black text-white font-black text-sm px-2 py-1">02</span>
                            <h2 className="font-medium tracking-tight uppercase text-xl">Model Measurements</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2" htmlFor="height">Height (cm)</label>
                                <input
                                    type="text"
                                    id="height"
                                    className="neo-input h-16 w-full"
                                    value={measurement.height}
                                    onChange={(e) => setMeasurement({ ...measurement, height: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2" htmlFor="waist">Waist (cm)</label>
                                <input
                                    type="text"
                                    id="waist"
                                    className="neo-input h-16 w-full"
                                    value={measurement.waist}
                                    onChange={(e) => setMeasurement({ ...measurement, waist: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2" htmlFor="eye">Eye (Color)</label>
                                <input
                                    type="text"
                                    id="eye"
                                    className="neo-input h-16 w-full"
                                    value={measurement.eye}
                                    onChange={(e) => setMeasurement({ ...measurement, eye: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2" htmlFor="hip">Hip (cm)</label>
                                <input
                                    type="text"
                                    id="hip"
                                    className="neo-input h-16 w-full"
                                    value={measurement.hip}
                                    onChange={(e) => setMeasurement({ ...measurement, hip: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2" htmlFor="dressSize">Dress Size</label>
                                <input
                                    type="text"
                                    id="dressSize"
                                    className="neo-input h-16 w-full"
                                    value={measurement.dressSize}
                                    onChange={(e) => setMeasurement({ ...measurement, dressSize: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2" htmlFor="shoe">Shoe Size</label>
                                <input
                                    type="text"
                                    id="shoe"
                                    className="neo-input h-16 w-full"
                                    value={measurement.shoe}
                                    onChange={(e) => setMeasurement({ ...measurement, shoe: e.target.value })}
                                    required
                                />
                            </div>
                             <div className="col-span-2">
                                <label className="block text-xs font-bold uppercase mb-2" htmlFor="chestBust">Chest/Bust (cm)</label>
                                <input
                                    type="text"
                                    id="chestBust"
                                    className="neo-input h-16 w-full"
                                    value={measurement.chestBust}
                                    onChange={(e) => setMeasurement({ ...measurement, chestBust: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </section>
                    
                    {/* 03 PORTFOLIO */}
                    <section>
                         <div className="flex items-center gap-2 mb-6">
                            <span className="bg-black text-white font-black text-sm px-2 py-1">03</span>
                            <h2 className="font-medium tracking-tight uppercase text-xl">Portfolio</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2" htmlFor="instagram">Instagram Handle</label>
                                <input
                                    type="text"
                                    id="instagram"
                                    className="neo-input h-16 w-full"
                                    placeholder="@username"
                                    value={portfolio.instagram}
                                    onChange={(e) => setPortfolio({ ...portfolio, instagram: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2" htmlFor="otherLink">Other Link</label>
                                <input
                                    type="text"
                                    id="otherLink"
                                    className="neo-input h-16 w-full"
                                    placeholder="https://"
                                    value={portfolio.other}
                                    onChange={(e) => setPortfolio({ ...portfolio, other: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <ImageUpload 
                            images={portfolioImages}
                            setImages={setPortfolioImages}
                            caption="Upload model portfolio images"
                            allowMultiple={true}
                        />
                    </section>

                    {/* 04 SETTINGS & POLAROIDS */}
                    <section>
                         <div className="flex items-center gap-2 mb-6">
                            <span className="bg-black text-white font-black text-sm px-2 py-1">04</span>
                            <h2 className="font-medium tracking-tight uppercase text-xl">Settings & Polaroids</h2>
                        </div>
                        
                        <div className="neo-box p-6 bg-white mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <span className="block text-[10px] font-bold uppercase text-gray-400 mb-3 tracking-widest">Classification</span>
                                    <div className="flex gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <div className={`w-5 h-5 border-2 border-black flex items-center justify-center transition-colors ${newFace ? 'bg-black' : 'bg-white group-hover:bg-gray-100'}`}>
                                                {newFace && <div className="w-2 h-2 bg-white" />}
                                            </div>
                                            <input type="checkbox" className="hidden" checked={newFace} onChange={() => setNewFace(!newFace)} />
                                            <span className="font-bold text-xs uppercase">New Face</span>
                                        </label>

                                         <label className="flex items-center gap-2 cursor-pointer group">
                                            <div className={`w-5 h-5 border-2 border-black flex items-center justify-center transition-colors ${topModel ? 'bg-black' : 'bg-white group-hover:bg-gray-100'}`}>
                                                {topModel && <div className="w-2 h-2 bg-white" />}
                                            </div>
                                            <input type="checkbox" className="hidden" checked={topModel} onChange={() => setTopModel(!topModel)} />
                                            <span className="font-bold text-xs uppercase">Top Model</span>
                                        </label>
                                    </div>
                                </div>

                                 <div>
                                    <span className="block text-[10px] font-bold uppercase text-gray-400 mb-3 tracking-widest">Gender</span>
                                    <div className="flex gap-6">
                                        {['male', 'female',].map((g) => (
                                            <label key={g} className="flex items-center gap-2 cursor-pointer group">
                                                <div className={`w-5 h-5 rounded-full border-2 border-black flex items-center justify-center transition-colors ${gender === g ? 'bg-black' : 'bg-white group-hover:bg-gray-100'}`}>
                                                    {gender === g && <div className="w-2 h-2 rounded-full bg-white" />}
                                                </div>
                                                <input 
                                                    type="radio" 
                                                    name="gender" 
                                                    className="hidden" 
                                                    checked={gender === g} 
                                                    onChange={() => setGender(g)} 
                                                />
                                                <span className="font-bold text-xs uppercase">{g}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ImageUpload 
                            images={modelImages}
                            setImages={setModelImages}
                            caption="Upload model polaroids (Raw)"
                            allowMultiple={true}
                        />
                    </section>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full neo-button bg-lit-blue text-white py-4 font-black uppercase tracking-widest text-lg hover:bg-lit-blue/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {processing ? <ImSpinner8 className="animate-spin" /> : "Add Model to Database"}
                    </button>
                </form>
            </div>
        </PageLayout>
    );
};

export default AddModel;
