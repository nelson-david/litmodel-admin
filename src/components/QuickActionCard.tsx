import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

interface QuickActionCardProps {
	title: string;
	subtitle: string;
	link: string;
	color?: string;
    textColor?: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
	title,
	subtitle,
	link,
	color = "bg-lit-yellow",
    textColor = "text-black"
}) => {
	return (
		<Link
			to={link}
			className={`neo-box ${color} ${textColor} p-6 flex items-center justify-between group cursor-pointer border-3`}
		>
			<div>
				<h3 className="font-display font-black text-lg leading-tight mb-1">
					{title}
				</h3>
				<p className="text-xs font-bold opacity-80">{subtitle}</p>
			</div>
			<HiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
		</Link>
	);
};

export default QuickActionCard;
