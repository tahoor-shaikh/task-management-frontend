export interface Task {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
}

export interface AuthState {
	token: string | null;
}

export interface TaskState {
	tasks: Task[];
}

export interface SignUpPayload {
	username: string;
	email: string;
	password: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface SignupData {
	username: string;
	email: string;
	password: string;
}
