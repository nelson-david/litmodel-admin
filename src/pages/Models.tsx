import { Link } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import { useEffect, useState } from "react";
import ModelCard from "../components/ModelCard";
import ModelCardSkeleton from "../components/ModelCardSkeleton";
import DeleteModal from "../components/DeleteModal";
import { useAtom } from "jotai";
import { allModels } from "../utils/jotaiAtom";
import { ADMIN_TOKEN, API_URL, errorToast, successToast } from "../config";
import axios from "axios";
import { HiSearch, HiPlus } from "react-icons/hi";

const MODELS_PER_PAGE = 9;

const Models: React.FC<{
    loading: boolean;
    reloadModels: any;
}> = ({ loading, reloadModels }) => {
    const [search, setSearch] = useState("");
    const [currentModels, setCurrentModels] = useState<any[]>([]);
    const [filteredModels, setFilteredModels] = useState<any[]>([]);
    const [modelList, _] = useAtom(allModels);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    
    // Delete modal state
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [modelToDelete, setModelToDelete] = useState<string | null>(null);
    const [processingDelete, setProcessingDelete] = useState(false);

    useEffect(() => {
        setCurrentModels(modelList);
        setFilteredModels(modelList);
    }, [modelList]);

    useEffect(() => {
        const query = search.toLowerCase().trim();
        if (!query) {
            setFilteredModels(currentModels);
        } else {
            const filtered = currentModels.filter((item: any) =>
                (item.fullName || "").toLowerCase().includes(query)
            );
            setFilteredModels(filtered);
        }
        setCurrentPage(1); // Reset to first page on search
    }, [search, currentModels]);

    // Pagination logic
    const totalPages = Math.ceil(filteredModels.length / MODELS_PER_PAGE);
    const startIndex = (currentPage - 1) * MODELS_PER_PAGE;
    const paginatedModels = filteredModels.slice(startIndex, startIndex + MODELS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Delete handling
    const openDeleteModal = (id: string) => {
        setModelToDelete(id);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setModelToDelete(null);
        setProcessingDelete(false);
    };

    const handleDelete = () => {
        if (!modelToDelete) return;
        
        setProcessingDelete(true);
        axios({
            method: "DELETE",
            url: `${API_URL}/model/${modelToDelete}/delete/`,
            headers: {
                "x-auth-token": ADMIN_TOKEN,
            },
        })
            .then(() => {
                reloadModels().then((res: string) => {
                    setProcessingDelete(false);
                    if (res === "success") {
                        successToast("Model deleted");
                    } else {
                        errorToast("An error occured");
                    }
                    closeDeleteModal();
                });
            })
            .catch((error) => {
                errorToast(error.message);
                setProcessingDelete(false);
                closeDeleteModal();
            });
    };


    return (
        <PageLayout>
            <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                            <HiSearch className="text-gray-400 w-6 h-6" />
                        </div>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="SEARCH MODELS..."
                            className="w-full h-14 pl-12 pr-4 bg-white border-2 border-black text-sm font-bold tracking-widest uppercase placeholder-gray-400 focus:outline-none! shadow-neo focus:-translate-x-px focus:-translate-y-px focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                        />
                    </div>
                    
                    <Link 
                        to="/models/new"
                        className="neo-button bg-lit-blue text-white w-full md:w-auto px-10 py-3 border-2 border-black font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-neo transition-all h-14 text-sm"
                    >
                        <HiPlus className="w-4 h-4" />
                        Add New Model
                    </Link>
                </div>

                {/* Content Section */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
                       {[...Array(6)].map((_, i) => (
                           <ModelCardSkeleton key={i} />
                       ))}
                    </div>
                ) : (
                    <>
                        {paginatedModels.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-5">
                                {paginatedModels.map((model) => (
                                    <ModelCard 
                                        key={model._id} 
                                        model={model} 
                                        onDelete={openDeleteModal}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white border-2 border-dashed border-gray-300">
                                <p className="font-bold text-gray-400 uppercase text-lg">No models found</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-5 mb-10">
                                <button
                                    type="button"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`w-10 h-10 flex items-center justify-center border-2 border-black font-bold transition-all cursor-pointer ${
                                        currentPage === 1 
                                            ? "opacity-50 cursor-not-allowed bg-gray-100" 
                                            : "bg-white hover:bg-black hover:text-white"
                                    }`}
                                >
                                    &lt;
                                </button>
                                
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        type="button"
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-10 h-10 flex items-center justify-center border-2 border-black font-bold transition-all cursor-pointer ${
                                            currentPage === page
                                                ? "bg-lit-blue text-white shadow-neo-hover -translate-x-px -translate-y-px"
                                                : "bg-white hover:bg-black hover:text-white"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`w-10 h-10 flex items-center justify-center border-2 border-black font-bold transition-all cursor-pointer ${
                                        currentPage === totalPages
                                            ? "opacity-50 cursor-not-allowed bg-gray-100" 
                                            : "bg-white hover:bg-black hover:text-white"
                                    }`}
                                >
                                    &gt;
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <DeleteModal
                openModal={deleteModalOpen}
                cycleOpenModal={closeDeleteModal}
                actionToTake={handleDelete}
                processingDelete={processingDelete}
                deleteType="model"
            />
        </PageLayout>
    );
};

export default Models;
