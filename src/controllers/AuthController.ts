import { END_POINTS } from "../constants/ApiEndpoints";
import ApiService from "../services/ApiService";
import { ChangePasswordPayload, LoginPayload, SignUpPayload } from "../types";

const BASE_URL = ApiService.getApiUrl();

export const signUpUser = async (payload: SignUpPayload) => {
	const url = `${BASE_URL}${END_POINTS.SIGNUP}`;

	return await ApiService.callPostApi(url, payload);
};

export const loginUser = async (payload: LoginPayload) => {
	const url = `${BASE_URL}${END_POINTS.LOGIN}`;

	return await ApiService.callPostApi(url, payload);
};

export const changePassword = async (payload: ChangePasswordPayload) => {
	const url = `${BASE_URL}${END_POINTS.CHANGE_PASSWORD}`;

	return await ApiService.callPostApi(url, payload);
};
