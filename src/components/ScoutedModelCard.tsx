import React, { useState } from "react";
import { HiTrash, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import CustomImage from "./CustomImage";
import { convertDate } from "../utils/convertDate";
import { API_URL, ADMIN_TOKEN, errorToast, successToast } from "../config";
import axios from "axios";
import DeleteModal from "./DeleteModal";

interface ScoutedModelCardProps {
	model: any;
	reloadModels: any;
}

const ScoutedModelCard: React.FC<ScoutedModelCardProps> = ({
	model,
	reloadModels,
}) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [processingDelete, setProcessingDelete] = useState(false);
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>(null);

	// Minimum swipe distance (in px)
	const minSwipeDistance = 50;

	const images =
		model.polaroid && model.polaroid.length > 0
			? model.polaroid
			: ["https://placehold.co/400x500"];

	const nextImage = (e?: React.MouseEvent) => {
		e?.stopPropagation();
		setCurrentImageIndex((prev) => (prev + 1) % images.length);
	};

	const prevImage = (e?: React.MouseEvent) => {
		e?.stopPropagation();
		setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	const onTouchStart = (e: React.TouchEvent) => {
		setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMove = (e: React.TouchEvent) =>
		setTouchEnd(e.targetTouches[0].clientX);

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;
		if (isLeftSwipe || isRightSwipe) {
			if (isLeftSwipe) {
				// Next image
				nextImage();
			} else {
				// Prev image
				prevImage();
			}
		}
	};

	const handleDelete = () => {
		setProcessingDelete(true);
		axios({
			method: "DELETE",
			url: `${API_URL}/scouted-model/delete/${model._id}`,
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
					setDeleteModalOpen(false);
				});
			})
			.catch((error) => {
				errorToast(error.message);
				setProcessingDelete(false);
				setDeleteModalOpen(false);
			});
	};

	// Helper to get badges based on status (assuming status exists, or we fake it for now as per design)
	// The reference image had "Pending Review", "Shortlisted", "New Submission"
	// We can use model.dateAdded to determine "New Submission" if recent?
	// For now, I'll add a "New Submission" badge if it's less than 7 days old.
	const isNew =
		new Date(model.dateAdded).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;

	return (
		<div className="neo-box p-3 bg-white flex flex-col h-full relative group">
			{/* Image Section */}
			<div
				className="relative aspect-3/4 border-2 border-black mb-4 overflow-hidden bg-gray-100"
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				<CustomImage
					key={currentImageIndex} // Key forces re-render for shimmer on change if needed, or just let src change
					src={images[currentImageIndex]}
					alt={model.fullName}
					className="w-full h-full object-cover"
				/>

				{/* Badges */}
				<div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
					{isNew && (
						<span className="bg-lit-blue text-white text-[10px] font-black uppercase px-2 py-1 border-2 border-black shadow-neo-hover">
							New Submission
						</span>
					)}
					{/* Placeholder for other statuses if they exist in data */}
					{/* <span className="bg-lit-yellow text-black text-[10px] font-black uppercase px-2 py-1 border-2 border-black shadow-neo-hover">
                        Pending
                    </span> */}
				</div>

				{/* Carousel Controls */}
				{images.length > 1 && (
					<>
						<button
							type="button"
							onClick={prevImage}
							className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
						>
							<HiChevronLeft />
						</button>
						<button
							type="button"
							onClick={nextImage}
							className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
						>
							<HiChevronRight />
						</button>

						<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
							{images.map((_: any, idx: number) => (
								<div
									key={idx}
									className={`w-1.5 h-1.5 rounded-full border border-black ${idx === currentImageIndex ? "bg-black" : "bg-white"}`}
								/>
							))}
						</div>
					</>
				)}
			</div>

			{/* Content Section */}
			<div className="grow flex flex-col">
				<div className="mb-4">
					<h3 className="font-display font-black text-2xl uppercase leading-none mb-1 truncate">
						{model.fullName}
					</h3>
					<p className="text-xs font-bold text-gray-500 truncate">
						{model.email}
					</p>
					<p className="text-xs text-gray-400 mt-1">
						Born: {convertDate(model.dateOfBirth, "fulldate")}
					</p>
				</div>

				<div className="border-t-2 border-dashed border-gray-200 mb-4"></div>

				{/* Measurements Grid - Matching reference style */}
				<div className="mb-4">
					<p className="font-bold text-[10px] uppercase tracking-widest text-gray-400 mb-2">
						Measurements
					</p>
					<div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
						<div className="flex justify-between border-b border-gray-100 pb-1">
							<span className="font-bold text-gray-500">Height</span>
							<span className="font-black">
								{model.measurement?.height || "-"}
							</span>
						</div>
						<div className="flex justify-between border-b border-gray-100 pb-1">
							<span className="font-bold text-gray-500">Hair</span>
							<span className="font-black">
								{model.measurement?.hair || "-"}
							</span>
						</div>
						<div className="flex justify-between border-b border-gray-100 pb-1">
							<span className="font-bold text-gray-500">Chest</span>
							<span className="font-black">
								{model.measurement?.chestBust || "-"}
							</span>
						</div>
						<div className="flex justify-between border-b border-gray-100 pb-1">
							<span className="font-bold text-gray-500">Waist</span>
							<span className="font-black">
								{model.measurement?.waist || "-"}
							</span>
						</div>
						<div className="flex justify-between border-b border-gray-100 pb-1">
							<span className="font-bold text-gray-500">Hips</span>
							<span className="font-black">
								{model.measurement?.hips || "-"}
							</span>
						</div>
						<div className="flex justify-between border-b border-gray-100 pb-1">
							<span className="font-bold text-gray-500">Shoe</span>
							<span className="font-black">
								{model.measurement?.shoe || "-"}
							</span>
						</div>
					</div>
				</div>

				{/* Contact Info */}
				<div className="mb-4">
					<p className="font-bold text-[10px] uppercase tracking-widest text-gray-400 mb-2">
						Contact
					</p>
					<div className="space-y-2 text-xs">
						{model.instagramHandle && (
							<div className="flex items-center gap-2">
								<span className="font-bold text-gray-500 w-16 uppercase text-[10px]">
									Instagram
								</span>
								<a
									href={`https://instagram.com/${model.instagramHandle.replace("@", "")}`}
									target="_blank"
									rel="noopener noreferrer"
									className="font-black truncate hover:text-lit-blue hover:underline decoration-2"
								>
									@{model.instagramHandle.replace("@", "")}
								</a>
							</div>
						)}
						{model.phoneNumber && (
							<div className="flex items-center gap-2">
								<span className="font-bold text-gray-500 w-16 uppercase text-[10px]">
									Phone
								</span>
								<a
									href={`tel:${model.phoneNumber}`}
									className="font-black truncate hover:text-lit-blue hover:underline decoration-2"
								>
									{model.phoneNumber}
								</a>
							</div>
						)}
						{model.residentialAddress && (
							<div className="flex items-start gap-2">
								<span className="font-bold text-gray-500 w-16 uppercase text-[10px] shrink-0">
									Address
								</span>
								<span className="font-medium leading-tight">
									{model.residentialAddress}
								</span>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Footer */}
			<div className="mt-auto pt-3 border-t-2 border-black flex items-center justify-between">
				<span className="font-mono text-[10px] text-gray-400 uppercase">
					Added: {convertDate(model.dateAdded, "ddmmyy")}
				</span>

				<button
					type="button"
					onClick={() => setDeleteModalOpen(true)}
					className="w-8 h-8 flex items-center justify-center border-[1.5px] border-black bg-white hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors cursor-pointer"
					title="Delete Submission"
				>
					<HiTrash className="w-4 h-4" />
				</button>
			</div>

			<DeleteModal
				openModal={deleteModalOpen}
				cycleOpenModal={() => setDeleteModalOpen(false)}
				actionToTake={handleDelete}
				processingDelete={processingDelete}
				deleteType="model"
			/>
		</div>
	);
};

export default ScoutedModelCard;
