import { AnimatePresence, motion } from "framer-motion";
import { ImSpinner8 } from "react-icons/im";

interface DeleteProps {
    openModal: boolean;
    cycleOpenModal: any;
    actionToTake: any;
    processingDelete: boolean;
    deleteType: string;
}

const DeleteModal: React.FC<DeleteProps> = ({
    openModal,
    cycleOpenModal,
    actionToTake,
    processingDelete,
    deleteType,
}) => {
    return (
        <AnimatePresence>
            {openModal && (
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={cycleOpenModal}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="neo-box w-full max-w-sm bg-white p-8 relative flex flex-col items-center text-center"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", damping: 15, stiffness: 300 }}
                    >
                        <div className="mb-8">
                            <h5 className="font-display font-black text-lg leading-tight">
                                Are you sure you want to delete this{" "}
                                <span className="text-lit-blue">{deleteType}</span>?
                            </h5>
                        </div>
                        
                        <div className="flex gap-4 w-full">
                            <button 
                                onClick={cycleOpenModal} 
                                type="button"
                                className="neo-button flex-1 bg-white text-white! cursor-pointer hover:bg-gray-100 py-3 text-sm"
                            >
                                No
                            </button>
                            <button
                                onClick={actionToTake}
                                disabled={processingDelete}
                                className="neo-button flex-1 bg-red-500 border-black! cursor-pointer text-white hover:bg-red-500 hover:border-red-500 py-3 flex items-center justify-center text-sm"
                                type="button"
                            >
                                {processingDelete ? <ImSpinner8 className="animate-spin text-xl" /> : "YES"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeleteModal;
