const DashboardLoader = () => {
	return (
		<div className="space-y-10 animate-pulse">
			{/* Header Section */}
			<section>
				<div className="h-10 w-64 bg-gray-200 rounded mb-2"></div>
				<div className="h-5 w-96 bg-gray-200 rounded"></div>
			</section>

			{/* Stats Grid */}
			<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{[1, 2, 3].map((i) => (
					<div key={i} className="h-40 border-3 border-gray-200 p-6 flex flex-col justify-between">
						<div>
							<div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
							<div className="h-12 w-16 bg-gray-200 rounded"></div>
						</div>
						<div className="h-4 w-12 bg-gray-200 rounded self-end"></div>
					</div>
				))}
			</section>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
				{/* Recent Models - Takes up 2 columns */}
				<div className="lg:col-span-2 space-y-6">
					<div className="flex items-center justify-between">
						<div className="h-8 w-48 bg-gray-200 rounded"></div>
						<div className="h-4 w-16 bg-gray-200 rounded"></div>
					</div>

					<div className="space-y-4">
						{[1, 2, 3].map((i) => (
							<div key={i} className="h-24 border-3 border-gray-200 p-4 flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className="w-16 h-16 bg-gray-200"></div>
									<div className="space-y-2">
										<div className="h-6 w-32 bg-gray-200 rounded"></div>
										<div className="h-4 w-24 bg-gray-200 rounded"></div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Quick Actions - Takes up 1 column */}
				<div className="space-y-6">
					<div className="h-8 w-48 bg-gray-200 rounded"></div>
					<div className="space-y-4">
						{[1, 2].map((i) => (
							<div key={i} className="h-24 border-3 border-gray-200 p-6 flex items-center justify-between">
								<div className="space-y-2">
									<div className="h-6 w-40 bg-gray-200 rounded"></div>
									<div className="h-3 w-32 bg-gray-200 rounded"></div>
								</div>
								<div className="w-6 h-6 bg-gray-200 rounded-full"></div>
							</div>
						))}
						
                        {/* Search Bar Mimic */}
						<div className="h-32 border-3 border-gray-200 p-6">
                            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                            <div className="h-12 w-full bg-gray-200 rounded"></div>
                        </div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLoader;
