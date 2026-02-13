import React, { useRef, useState } from "react";
import { HiCloudUpload, HiX } from "react-icons/hi";
import { API_URL, ADMIN_TOKEN, errorToast } from "../config";
import axios from "axios";

interface ImageUploadProps {
    images: string[];
    setImages: (images: string[]) => void;
    caption?: string;
    maxFiles?: number;
    allowMultiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    images,
    setImages,
    caption = "Upload images",
    // maxFiles = 10,
    allowMultiple = true,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("images", file);
        });

        try {
            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-auth-token": ADMIN_TOKEN,
                },
            });

            if (response.data && response.data.data) {
                const newUrls = response.data.data;
                if (allowMultiple) {
                    setImages([...images, ...newUrls]);
                } else {
                    setImages([newUrls[0]]); // Replace if single file
                }
            }
        } catch (error: any) {
            console.error("Upload error:", error);
            errorToast(error.response?.data?.message || "Failed to upload images");
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const removeImage = (indexToRemove: number) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="w-full">
             <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple={allowMultiple}
                accept="image/*"
            />
            
            {/* Upload Area */}
            <button 
                type="button"
                onClick={() => !uploading && fileInputRef.current?.click()}
                className={`neo-box w-full border-dotted! bg-lit-blue/5 hover:bg-lit-blue/10 transition-colors p-8 flex flex-col items-center justify-center cursor-pointer min-h-[200px] ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {uploading ? (
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-lit-blue border-t-transparent rounded-full animate-spin mb-2"></div>
                        <span className="font-bold text-sm uppercase">Uploading...</span>
                    </div>
                ) : (
                    <>
                        <HiCloudUpload className="text-4xl mb-2" />
                        <span className="font-bold text-sm uppercase">{caption}</span>
                        <span className="text-xs text-gray-500 mt-1">JPG, PNG up to 10MB each</span>
                    </>
                )}
            </button>

            {/* Preview Area */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {images.map((url, index) => (
                        <div key={index} className="relative aspect-3/4 group neo-box p-1 bg-white">
                            <img 
                                src={url} 
                                alt={`Uploaded ${index}`} 
                                className="w-full h-full object-cover border-2 border-black" 
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white border-2 border-black flex items-center justify-center shadow-neo-sm hover:scale-110 transition-transform"
                            >
                                <HiX className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
