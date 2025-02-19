import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SCREENS } from "./screens";

import { AuthStackParamList } from "./types";

import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
	return (
		<AuthStack.Navigator>
			<AuthStack.Screen
				name={SCREENS.LOGIN}
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
			<AuthStack.Screen
				name={SCREENS.SIGNUP}
				component={SignupScreen}
				options={{ headerShown: false }}
			/>
		</AuthStack.Navigator>
	);
};
