import PageLayout from "../layouts/PageLayout";
import ScoutedModelLoader from "../components/ScoutedModelLoader";
import { useEffect, useState } from "react";
import ScoutedModelCard from "../components/ScoutedModelCard";
import { useAtom } from "jotai";
import { allScoutedModels } from "../utils/jotaiAtom";

const ScoutedModels: React.FC<{
    loading: boolean;
    reloadModels: any;
}> = ({ loading, reloadModels }) => {
    const [currentModels, setCurrentModels] = useState<any[]>([]);
    const [scoutedModelList, _] = useAtom(allScoutedModels);

    useEffect(() => {
        setCurrentModels(scoutedModelList);
    }, [scoutedModelList]);

    return (
        <PageLayout>
             <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start sm:items-center justify-between gap-4">
                     <div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase">Scouted Models</h1>
                        <p className="text-gray-500 font-medium">Review and manage new submissions.</p>
                    </div>
                </div>

                {/* Content Section */}
                {loading ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
                        {[...Array(6)].map((_, i) => (
                            <ScoutedModelLoader key={i} />
                        ))}
                    </div>
                ) : (
                    currentModels.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
                            {currentModels.map((model) => (
                                <ScoutedModelCard 
                                    key={model._id} 
                                    model={model} 
                                    reloadModels={reloadModels}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white border-2 border-dashed border-gray-300">
                            <p className="font-bold text-gray-400 uppercase text-lg">No new submissions</p>
                        </div>
                    )
                )}
            </div>
        </PageLayout>
    );
};

export default ScoutedModels;
