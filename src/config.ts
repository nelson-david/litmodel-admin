import { toast } from "react-toastify";

export const ADMIN_TOKEN = "thisistheadmintoken";
// export const API_URL = "http://localhost:6500/api/v1";
export const API_URL = "https://api-v1.litmodelmanagement.com/api/v1";

export const successToast = (success: string) =>
	toast.success(`${success}`, {
		position: "top-right",
		theme: "dark",
		autoClose: 2500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	});
export const errorToast = (error: string) =>
	toast.error(`${error}`, {
		position: "top-right",
		theme: "dark",
		autoClose: 2500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	});
export const warningToast = (warning: string) =>
	toast.warning(`${warning}`, {
		position: "top-right",
		theme: "dark",
		autoClose: 2500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	});
