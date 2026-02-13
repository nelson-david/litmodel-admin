import { useAtom } from "jotai";
import { allModels, allScoutedModels } from "../utils/jotaiAtom";
import { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import StatsCard from "../components/StatsCard";
import ModelListItem from "../components/ModelListItem";
import QuickActionCard from "../components/QuickActionCard";
import DashboardLoader from "../components/DashboardLoader";

const Dashboard: React.FC<{
	loading: boolean;
}> = ({ loading }) => {
	const [models] = useAtom(allModels);
	const [scoutedModels] = useAtom(allScoutedModels);
	const [newFaces, setNewFaces] = useState<any[]>([]);

	useEffect(() => {
		if (!loading && models) {
			const dummyNewFaces = models.filter((model) => model.newFace === true);
			setNewFaces(dummyNewFaces);
		}
	}, [loading, models]);

	// Mock recent models if data is empty or for display purposes
	const recentModels = models.slice(0, 3);

	return (
		<PageLayout>
			{loading ? (
				<DashboardLoader />
			) : (
				<div className="space-y-10">
					{/* Header Section */}
					<section>
						<h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tighter">
							Lit Model Stats
						</h1>
						<p className="text-gray-500 font-medium">
							Overview of your agency performance this month.
						</p>
					</section>

					{/* Stats Grid */}
					<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<StatsCard
							title="Total Models"
							value={models.length}
							trend="2"
							trendUp={true}
						/>
						<StatsCard
							title="Total Scouted Models"
							value={scoutedModels.length}
							trend="42"
							trendUp={true}
						/>
						<StatsCard
							title="New Faces"
							value={newFaces.length}
							trend="0%"
							trendUp={false}
						/>
					</section>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
						{/* Recent Models - Takes up 2 columns */}
						<div className="lg:col-span-2 space-y-6">
							<div className="flex items-center justify-between">
								<h2 className="text-2xl font-black tracking-tighter">
									Recent Models
								</h2>
								<a
									href="/models"
									className="text-sm font-bold underline decoration-2 hover:text-lit-blue"
								>
									VIEW ALL
								</a>
							</div>

							<div className="space-y-4">
								{recentModels.length > 0 ? (
									recentModels.map((model) => (
										<ModelListItem key={model.id} model={model} />
									))
								) : (
									<div className="neo-box p-6 text-center text-gray-500 font-bold">
										No recent models found.
									</div>
								)}
							</div>
						</div>

						{/* Quick Actions - Takes up 1 column */}
						<div className="space-y-6">
							<h2 className="text-2xl font-black tracking-tighter">
								Quick Actions
							</h2>
							<div className="space-y-4">
								<QuickActionCard
									title="NEW SCOUTING TRIP"
									subtitle="Schedule a new session"
									link="/scouted-models"
									color="bg-lit-yellow!"
								/>
								<QuickActionCard
									title="SEND NEWSLETTER"
									subtitle={`Notify ${scoutedModels.length} subscribers`}
									link="/newsletter"
									color="bg-lit-blue!"
                                    textColor="text-white"
								/>
								<div className="neo-box p-5">
									<h3 className="font-display font-black text-lg mb-4 tracking-tight">
										SEARCH DATABASE
									</h3>
									<div className="relative -mt-1">
										<input
											type="text"
											placeholder="Search models, IDs..."
											className="neo-input placeholder:uppercase text-sm placeholder:text-sm h-12"
										/>
										<button className="absolute right-3 top-1/2 -translate-y-1/2" type="button">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<title>Search</title>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</PageLayout>
	);
};

export default Dashboard;
