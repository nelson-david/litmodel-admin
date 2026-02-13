import { Link } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi";
import { convertDate } from "../utils/convertDate";
import CustomImage from "./CustomImage";

interface ModelCardProps {
    model: any;
    onDelete: (id: string) => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onDelete }) => {
    // Helper to safely get measurement
    const getMeasurement = (key: string) => {
        if (!model.measurement) return "-";
        // Handle case where keys might be lowercase or capitalized differently in DB
        const val = model.measurement[key] || model.measurement[key.toLowerCase()] || "-";
        return val;
    };

    return (
        <div className="neo-box p-3 bg-white flex flex-col h-full relative group hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            {/* Image Section */}
            <div className="relative aspect-3/4 border-2 border-black mb-4 overflow-hidden">
                <CustomImage
                    src={model.headerImage || model.polaroid?.[0] || "https://placehold.co/400x500"}
                    alt={model.fullName}
                    className="w-full h-full object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {model.newFace && (
                        <div className="bg-white border-2 border-black px-2 py-1 font-bold text-xs uppercase tracking-wider shadow-neo-hover">
                            New Face
                        </div>
                    )}
                    {model.mainboard && ( // Assuming 'mainboard' property exists or fits 'topModel' logic
                         <div className="bg-white border-2 border-black px-2 py-1 font-bold text-xs uppercase tracking-wider shadow-neo-hover">
                            Mainboard
                        </div>
                    )}
                     {model.topModel && !model.mainboard && (
                         <div className="bg-white border-2 border-black px-2 py-1 font-bold text-xs uppercase tracking-wider shadow-neo-hover">
                            Top Model
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="grow flex flex-col">
                <h3 className="font-display font-black text-2xl tracking-tight uppercase leading-none mb-1">
                    {model.fullName}
                </h3>
                <p className="font-bold text-lit-blue italic uppercase text-sm mb-4">
                    {model.shortDescription || model.nationality || "Model"}
                </p>

                <div className="border-t-2 border-dashed border-gray-200 my-2"></div>
                
                <p className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-3">Measurements</p>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mb-6">
                    <div>
                        <span className="block text-xs text-gray-400 uppercase">Height</span>
                        <span className="font-black font-display">{getMeasurement("height")} CM</span>
                    </div>
                    <div>
                        <span className="block text-xs text-gray-400 uppercase">Waist</span>
                        <span className="font-black font-display">{getMeasurement("waist")}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-gray-400 uppercase">Eye</span>
                        <span className="font-black font-display uppercase">{getMeasurement("eye") || getMeasurement("eyes")}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-gray-400 uppercase">Hip</span>
                        <span className="font-black font-display">{getMeasurement("hip") || getMeasurement("hips")}</span>
                    </div>
                    <div>
                        <span className="block text-xs text-gray-400 uppercase">Chest/Bust</span>
                        <span className="font-black font-display">{getMeasurement("chestBust") || getMeasurement("bust")} CM</span>
                    </div>
                     <div>
                        <span className="block text-xs text-gray-400 uppercase">Shoe</span>
                        <span className="font-black font-display">{getMeasurement("shoe")}</span>
                    </div>
                </div>
            </div>

            {/* Footer / Actions */}
            <div className="mt-auto pt-4 border-t-2 border-black flex items-center justify-between">
                <span className="font-mono text-xs text-gray-400 uppercase">
                    REF: {model.dateAdded ? convertDate(model.dateAdded, "ddmmyy") : model._id?.slice(-8)}
                </span>
                
                <div className="flex gap-2">
                     <Link
                        to={`/models/${model._id}/edit`}
                        className="w-12 h-12 flex items-center justify-center border-[1.5px] border-black bg-white hover:bg-black hover:text-white transition-colors cursor-pointer"
                    >
                        <HiPencil className="w-4 h-4" />
                    </Link>
                    <button 
                        onClick={() => onDelete(model._id)}
                        className="w-12 h-12 flex items-center justify-center border-[1.5px] border-black bg-white hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors cursor-pointer"
                        type="button"
                    >
                        <HiTrash className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModelCard;
