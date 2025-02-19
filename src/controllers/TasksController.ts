import { END_POINTS } from "../constants/ApiEndpoints";
import ApiService from "../services/ApiService";
import { CreateTaskPayload, UpdateTaskPayload } from "../types";

const BASE_URL = ApiService.getApiUrl();

export const createTask = async (payload: CreateTaskPayload) => {
	const url = `${BASE_URL}${END_POINTS.CREATE_TASK}`;

	return await ApiService.callPostApi(url, payload);
};

export const getTasks = async () => {
	const url = `${BASE_URL}${END_POINTS.GET_TASKS}`;

	return await ApiService.callGetApi(url);
};

export const getTask = async (id: string) => {
	const url = `${BASE_URL}${END_POINTS.GET_TASK}/${id}`;

	return await ApiService.callGetApi(url);
};

export const updateTask = async (id: string, payload: UpdateTaskPayload) => {
	const url = `${BASE_URL}${END_POINTS.UPDATE_TASK}/${id}`;

	return await ApiService.callPutApi(url, payload);
};

export const deleteTask = async (id: string) => {
	const url = `${BASE_URL}${END_POINTS.DELETE_TASK}/${id}`;

	return await ApiService.callDeleteApi(url);
};
