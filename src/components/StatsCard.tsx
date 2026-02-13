interface StatsCardProps {
	title: string;
	value: string | number;
	trend?: string;
	trendUp?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
	title,
	value,
	trend,
	trendUp = true,
}) => {
	return (
		<div className="neo-box p-6 flex flex-col justify-between h-32 sm:h-40">
			<div>
				<h3 className="text-xs font-medium tracking-wide text-gray-500 mb-1">
					{title.toUpperCase()}
				</h3>
				<div className="text-4xl sm:text-5xl font-display font-black tracking-tighter">
					{value}
				</div>
			</div>
			{trend && (
				<div className="flex items-center justify-end">
					<span
						className={`text-sm font-bold ${
							trendUp ? "text-green-600" : "text-gray-400"
						}`}
					>
						{trendUp ? "↗" : "—"} {trend}
					</span>
				</div>
			)}
		</div>
	);
};

export default StatsCard;
