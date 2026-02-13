import { Link } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi";
import CustomImage from "./CustomImage";

interface ModelListItemProps {
	model: any;
}

const ModelListItem: React.FC<ModelListItemProps> = ({ model }) => {

	return (
		<div className="neo-box p-3 sm:p-4 flex items-center justify-between group hover:border-lit-blue transition-colors">
			<div className="flex items-center gap-2 sm:gap-4">
				<div className="w-16 h-16 border-2 border-black overflow-hidden relative">
					<CustomImage
						src={model.headerImage || "https://placehold.co/100"}
						alt={model.fullName}
						className="w-full h-full object-cover"
					/>
				</div>
				<div>
					<h4 className="font-display font-black text-lg sm:text-xl leading-none">
						{model.fullName}
					</h4>
					<p className="text-xs sm:text-sm font-bold text-gray-500">
						{model.shortDescription || "Nationality"} • {`${model.measurement.height}CM` || "Height"}
					</p>
				</div>
			</div>

			<div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
				<Link
					to={`/models/${model._id}/edit`}
					className="w-10 h-10 flex items-center justify-center border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
				>
					<HiPencil />
				</Link>
				<button className="w-10 h-10 flex items-center justify-center border-2 border-black bg-white hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors cursor-pointer" type="button">
					<HiTrash />
				</button>
			</div>
		</div>
	);
};

export default ModelListItem;
