import { useEffect, useState } from "react";

const Navbar = () => {
	const [_, setActivePage] = useState("/");

	const pathname = window.location.pathname;
	useEffect(() => {
		setActivePage(pathname);
	}, [pathname]);

	return (
		<nav className="border-b-2 border-black dark:border-gray-800 bg-white dark:bg-card-dark sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<div className="flex items-center gap-2">
						<span className="text-2xl font-bold tracking-tighter uppercase italic">
							LitModel
						</span>
					</div>
					<div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
						<a className="hover:text-primary transition-colors" href="/app">
							Dashboard
						</a>
						<a
							className="text-primary underline decoration-2 underline-offset-4"
							href="/models"
						>
							Models
						</a>
						<a
							className="hover:text-primary transition-colors"
							href="/scouted-models"
						>
							Scouted
						</a>
						<a
							className="hover:text-primary transition-colors"
							href="/newsletter"
						>
							Newsletter
						</a>
					</div>
					<button
						className="p-2 neo-border hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
						type="button"
					>
						<span className="material-symbols-outlined block">contrast</span>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
