import React from "react";

const ModelCardSkeleton: React.FC = () => {
    return (
        <div className="neo-box p-3 bg-white flex flex-col h-full relative">
            {/* Image Placeholder */}
            <div className="relative aspect-3/4 border-2 border-black mb-4 overflow-hidden bg-gray-100">
                 <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
            </div>

            {/* Content Placeholder */}
            <div className="grow flex flex-col">
                {/* Title */}
                <div className="h-8 bg-gray-200 w-3/4 mb-2 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
                </div>
                {/* Subtitle */}
                <div className="h-4 bg-gray-200 w-1/2 mb-4 relative overflow-hidden">
                     <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
                </div>

                <div className="border-t-2 border-dashed border-gray-200 my-2"></div>
                
                {/* Measurements Header */}
                <div className="h-3 bg-gray-200 w-24 mb-3 relative overflow-hidden">
                     <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
                </div>

                {/* Measurements Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i}>
                            <div className="h-3 bg-gray-100 w-12 mb-1"></div>
                            <div className="h-4 bg-gray-200 w-16 relative overflow-hidden">
                                 <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Placeholder */}
            <div className="mt-auto pt-4 border-t-2 border-black flex items-center justify-between">
                <div className="h-3 bg-gray-200 w-20 relative overflow-hidden">
                     <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
                </div>
                
                <div className="flex gap-2">
                    <div className="w-12 h-12 border-[1.5px] border-black bg-gray-100 relative overflow-hidden">
                         <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
                    </div>
                    <div className="w-12 h-12 border-[1.5px] border-black bg-gray-100 relative overflow-hidden">
                         <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelCardSkeleton;
