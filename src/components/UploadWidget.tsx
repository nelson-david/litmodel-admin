import GalleryIcon from "../icons/GalleryIcon";

interface UWProps {
    images: any;
    setImages: any;
    caption?: string;
    renderOne?: boolean;
    id: string;
}

const UploadWidget: React.FC<UWProps> = ({
    images,
    setImages,
    caption,
    renderOne,
    id,
}) => {
    const openWidget = () => {
        const cloudName = "urban-dev";
        const uploadPreset = "assets";

        const useWindow: any = window;
        var myWidget = useWindow?.cloudinary?.createUploadWidget(
            {
                cloudName: cloudName,
                uploadPreset: uploadPreset,
            },
            (error: any, result: any) => {
                if (!error && result && result.event === "success") {
                    setImages((images: any) => [
                        result.info.secure_url,
                        ...images,
                    ]);
                }
            }
        );
        myWidget.open();
    };

    return (
        <>
            <div
                className="cloudinary-button uploadIndicator"
                id={id}
                onClick={openWidget}
            >
                <span>
                    <GalleryIcon />
                </span>
                <h5>{caption ? caption : "Select product images"}</h5>
            </div>
            <div className="imagesContent">
                <div className="row">
                    {!renderOne ? (
                        <>
                            {images.map((img: any, index: number) => {
                                return (
                                    <div className="col-xl-4" key={index}>
                                        <img src={img} alt={img} />
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            <div className="col-xl-4">
                                <img src={images[0]} alt={images[0]} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default UploadWidget;
