/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: "#2563eb",
				"lit-blue": "#2563eb", // Main brand blue
				"lit-yellow": "#ffd900", // Accent yellow
				"lit-black": "#000000",
				"lit-white": "#ffffff",
				"lit-bg": "#f8f8f8",
			},
			fontFamily: {
				display: ["Archivo Black", "sans-serif"], // Bold headers
				body: ["Space Grotesk", "sans-serif"], // Clean body text
			},
			boxShadow: {
				neo: "4px 4px 0px 0px rgba(0,0,0,1)",
				"neo-hover": "2px 2px 0px 0px rgba(0,0,0,1)",
				"neo-sm": "2px 2px 0px 0px rgba(0,0,0,1)",
			},
			borderWidth: {
				3: "3px",
			},
		},
	},
	plugins: [],
};
