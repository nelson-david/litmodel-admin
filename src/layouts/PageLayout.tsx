import Header from "./Header";
import NewNavbar from "../components/NewNavbar";
import Footer from "../components/Footer";

interface LayoutProps {
	children: any;
}

const PageLayout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col bg-lit-bg font-body text-lit-black">
			<Header />
			<NewNavbar />
			<main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-10">
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default PageLayout;
