import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FillArowLeft from "../icons/FillArrowLeft";
import FillArowRight from "../icons/FillArrowRight";

interface CarouselProps {
    images: string[];
}

const slideVariants = {
    hiddenRight: {
        x: "100%",
        opacity: 0,
    },
    hiddenLeft: {
        x: "-100%",
        opacity: 0,
    },
    visible: {
        x: "0",
        opacity: 1,
        transition: {
            duration: 0.8,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: 0.3,
        },
    },
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState("left");

    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === images.length ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setDirection("left");

        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleDotClick = (index: number) => {
        setDirection(index > currentIndex ? "right" : "left");
        setCurrentIndex(index);
    };

    return (
        <div className="carousel">
            <div className="carousel-images">
                <AnimatePresence>
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        variants={slideVariants}
                        initial={
                            direction === "right" ? "hiddenRight" : "hiddenLeft"
                        }
                        animate="visible"
                        exit="exit"
                    />
                </AnimatePresence>
                <div className="slide_direction">
                    <div className="left" onClick={handlePrevious}>
                        <FillArowLeft />
                    </div>
                    <div className="right" onClick={handleNext}>
                        <FillArowRight />
                    </div>
                </div>
                <div className="indicator">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${
                                currentIndex === index ? "active" : ""
                            }`}
                            onClick={() => handleDotClick(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
