import React from "react";

const ScoutedModelLoader: React.FC = () => {
    return (
        <div className="neo-box p-3 bg-white flex flex-col h-full relative animate-pulse">
            {/* Image Placeholder */}
            <div className="aspect-3/4 border-2 border-gray-200 mb-4 bg-gray-200 w-full" />

            {/* Content Section */}
            <div className="grow flex flex-col">
                <div className="mb-4">
                    {/* Name */}
                    <div className="h-8 bg-gray-200 w-3/4 mb-2" />
                    {/* Email */}
                    <div className="h-3 bg-gray-200 w-1/2 mb-2" />
                    {/* Date of Birth */}
                    <div className="h-3 bg-gray-200 w-1/3 mt-1" />
                </div>

                <div className="border-t-2 border-dashed border-gray-200 mb-4" />

                {/* Measurements Grid */}
                <div className="mb-4">
                    <div className="h-3 bg-gray-200 w-1/4 mb-2" /> {/* Title */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex justify-between border-b border-gray-100 pb-1">
                                <div className="h-4 bg-gray-200 w-12" />
                                <div className="h-4 bg-gray-200 w-8" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mb-4">
                    <div className="h-3 bg-gray-200 w-1/4 mb-2" /> {/* Title */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="h-3 bg-gray-200 w-16" />
                            <div className="h-3 bg-gray-200 w-24" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 bg-gray-200 w-16" />
                            <div className="h-3 bg-gray-200 w-24" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-3 border-t-2 border-gray-200 flex items-center justify-between">
                <div className="h-3 bg-gray-200 w-24" /> {/* Date Added */}
                <div className="w-8 h-8 bg-gray-200" /> {/* Delete Button */}
            </div>
        </div>
    );
};

export default ScoutedModelLoader;
