import { Link, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../utils/jotaiAtom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardIcon from "../icons/DashboardIcon";
import UserIcon from "../icons/UserIcon";
import ScoutedIcon from "../icons/ScoutedIcon";
import { useState } from "react";

const NewNavbar = () => {
	const location = useLocation();
	const [user] = useAtom(userAtom);
    const [isOpen, setIsOpen] = useState(false);

	const navLinks = [
		{ name: "Dashboard", path: "/", icon: DashboardIcon },
		{ name: "Models", path: "/models", icon: UserIcon },
		{ name: "Scouted", path: "/scouted-models", icon: ScoutedIcon },
		// { name: "Newsletter", path: "/newsletter", icon: NewsletterIcon },
	];

	return (
		<nav className="w-full bg-white border-b border-black/20 py-3 sm:py-4 px-4 sm:px-6 md:px-10 flex items-center justify-between sticky top-0 z-50">
			{/* Logo */}
			<div className="flex items-center gap-2">
				<span className="font-display font-black text-2xl tracking-tighter">
					LMM
				</span>
			</div>

			{/* Center Nav Pills */}
			<div className="hidden md:flex items-center bg-white border border-black/20 rounded-full px-1.5 py-1.5 shadow-neo-sm relative">
				{navLinks.map((link) => {
					const isActive = location.pathname === link.path;
					return (
						<Link
							key={link.name}
							to={link.path}
							className={`relative px-6 py-3 rounded-full text-sm font-bold transition-colors z-10 flex items-center gap-2 ${
								isActive
									? "text-white"
									: "text-gray-600 hover:bg-gray-100 hover:text-black"
							}`}
						>
							{isActive && (
								<motion.div
									layoutId="active-pill"
									className="absolute inset-0 bg-lit-blue rounded-full -z-10"
									transition={{ type: "spring", stiffness: 300, damping: 30 }}
								/>
							)}
							<link.icon className="w-4 h-4" />
							<span>{link.name}</span>
						</Link>
					);
				})}
			</div>

			{/* Right Actions */}
			<div className="flex items-center gap-4">
				{/* <button
					className="w-10 h-10 border-2 border-black bg-white shadow-neo-sm flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
					type="button"
				>
					<HiMoon className="text-xl" />
				</button> */}

				<div className="relative">
					<motion.button 
						type="button"
						className="flex items-center sm:gap-2 border border-black/20 p-1 sm:pr-4 bg-white shadow-neo-sm rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
						onClick={() => setIsOpen(!isOpen)}
						whileTap={{ scale: 0.95 }}
					>
						<img
							src={user?.photoURL || "https://ui-avatars.com/api/?name=Admin"}
							alt="Profile"
							className="w-10 sm:w-9 h-10 sm:h-9 rounded-full object-cover border border-black/20"
						/>
						<span className="font-bold text-sm hidden sm:block -ml-0.5">
							{user?.displayName || "Admin"}
						</span>
					</motion.button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute right-0 top-full mt-2 w-64 bg-white border-2 border-black shadow-neo rounded-xl overflow-hidden z-50 py-2"
                            >
                                <div className="px-4 py-2 border-b border-black/10 mb-2 sm:hidden">
                                     <span className="font-bold text-sm block">
                                        {user?.displayName || "Admin"}
                                    </span>
                                    <span className="text-xs text-gray-500 block truncate">
                                        {user?.email || "admin@litmodelmanagement.com"}
                                    </span>
                                </div>
                                
                                <div className="sm:hidden flex flex-col">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`px-4 py-3 flex items-center gap-3 hover:bg-lit-blue/5 transition-colors font-bold cursor-pointer ${
                                                location.pathname === link.path ? "text-lit-blue" : "text-black"
                                            }`}
                                        >
                                            <link.icon className="w-5 h-5" />
                                            {link.name}
                                        </Link>
                                    ))}
                                    <div className="h-px bg-black/10 my-2 mx-4" />
                                </div>

                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        // Add logout logic here if needed
                                    }}
                                    className="w-full text-left px-4 py-3 flex items-center gap-3 text-red-500 font-bold hover:bg-red-50 transition-colors cursor-pointer"
									type="button"
                                >
                                    <span className="w-5 h-5 flex items-center justify-center">→</span>
                                    Sign Out
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
				</div>
			</div>
		</nav>
	);
};

export default NewNavbar;
