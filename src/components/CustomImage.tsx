import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ 
    src, 
    alt, 
    className, 
    fallbackSrc = "https://placehold.co/400x500?text=No+Image",
    ...props 
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState(src);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        setImgSrc(src);
        setIsLoading(true);
        setRetryCount(0);
    }, [src]);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        if (retryCount < 3) {
            // Retry logic with exponential backoff
            const timeout = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
            setTimeout(() => {
                setRetryCount(prev => prev + 1);
                // Force reload by appending a unique query param if possible, or just re-setting.
                // Simple re-set might not trigger if browser cached the failure.
                // We'll append a retry param if it's a http(s) URL.
                if (src?.startsWith('http')) {
                    const separator = src.includes('?') ? '&' : '?';
                    setImgSrc(`${src}${separator}retry=${retryCount + 1}`);
                } else {
                    setImgSrc(src); 
                }
            }, timeout);
        } else {
            setIsLoading(false);
            setImgSrc(fallbackSrc);
        }
    };

    return (
        <div className={`relative overflow-hidden ${className} bg-gray-100`}>
            {/* Shimmer Placeholder */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-10"
                    >
                         <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/50 to-transparent" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Actual Image */}
            <img
                src={imgSrc}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                    isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={handleLoad}
                onError={handleError}
                {...props}
            />
        </div>
    );
};

export default CustomImage;
