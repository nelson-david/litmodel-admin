const Footer = () => {
	const currentYear = new Date().getFullYear();
	
	return (
		<footer className="w-full py-6 sm:py-8 px-2 sm:px-6 md:px-10 border-t border-black/20 bg-white flex flex-col md:flex-row items-center justify-between mt-auto">
			<div className="font-display font-black text-sm sm:text-base opacity-80">
				LITMODEL MANAGEMENT © {currentYear}
			</div>
			
			<div className="flex items-center gap-6 mt-4 md:mt-0 font-bold text-xs sm:text-sm underline decoration-2">
				<a href="/privacy-policy" className="hover:text-lit-blue">Privacy Policy</a>
				<a href="/terms-of-service" className="hover:text-lit-blue">Terms of Service</a>
				<a href="/support" className="hover:text-lit-blue">Support</a>
			</div>
		</footer>
	);
};

export default Footer;
