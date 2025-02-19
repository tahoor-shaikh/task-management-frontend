import axios from "axios";

import ENV from "../env/env.config";

import { store } from "../store";
import { toast } from "../utils/toast";
import { storeAuthData } from "../store/auth/authSlice";

class ApiService {
	getApiUrl() {
		return ENV.BASE_API_URL;
	}

	private async getAccessToken() {
		const token = store.getState().auth.token;
		return token;
	}

	private async handleError(error: any) {
		if (error.response) {
			console.log("Error data:", error.response.data);
			console.log("Error status:", error.response.status);

			if (error.response.status === 401) {
				toast.error("Token expired. Please login again.");
				store.dispatch(
					storeAuthData({
						token: null,
					})
				);
			}

			throw error.response.data;
		} else if (error.request) {
			// The request was made but no response was received
			console.log("No response received for the request");
			throw new Error("No response received for the request");
		} else {
			// Something else happened in setting up the request
			console.log("Error setting up the request:", error.message);
			throw error;
		}
	}

	async callPostApi(url: string, parameters: any, headers: any = {}) {
		try {
			const accessToken = await this.getAccessToken();
			headers = {
				...headers,
				"Content-Type": "application/json",
				Authorization: accessToken ? "Bearer " + accessToken : "",
			};
			const response = await axios.post(url, parameters, { headers: headers });
			return response.data;
		} catch (error: any) {
			this.handleError(error);
		}
	}

	async callGetApi(url: string, headers: any = {}) {
		try {
			const accessToken = await this.getAccessToken();
			console.log("accessToken :>> ", accessToken);

			headers = {
				...headers,
				"Content-Type": "application/json",
				Authorization: accessToken ? "Bearer " + accessToken : "",
			};

			const response = await axios.get(url, { headers: headers });
			return response.data;
		} catch (error: any) {
			this.handleError(error);
		}
	}

	async callPutApi(url: string, data?: any, headers: any = {}) {
		try {
			const accessToken = await this.getAccessToken();
			console.log("accessToken :>> ", accessToken);
			headers = {
				...headers,
				"Content-Type": "application/json",
				Authorization: accessToken ? "Bearer " + accessToken : "",
			};
			const response = await axios.put(url, data, { headers: headers });
			return response.data;
		} catch (error: any) {
			this.handleError(error);
		}
	}

	async callDeleteApi(url: string, headers: any = {}) {
		try {
			const accessToken = await this.getAccessToken();
			headers = {
				...headers,
				"Content-Type": "application/json",
				Authorization: accessToken ? "Bearer " + accessToken : "",
			};
			const response = await axios.delete(url, { headers: headers });
			return response.data;
		} catch (error: any) {
			this.handleError(error);
		}
	}
}

export default new ApiService();
