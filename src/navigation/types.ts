import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthStackParamList = {
	Login: undefined;
	Signup: undefined;
};

export type MainStackParamList = {
	Home: undefined;
	AddTask: undefined;
	TaskDetails: { taskId: string };
};

export type AuthScreenProps<T extends keyof AuthStackParamList> =
	NativeStackScreenProps<AuthStackParamList, T>;

export type MainScreenProps<T extends keyof MainStackParamList> =
	NativeStackScreenProps<MainStackParamList, T>;
