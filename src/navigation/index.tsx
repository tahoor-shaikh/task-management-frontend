import React from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AuthNavigator } from "./AuthNavigator";
import { MainNavigator } from "./MainNavigator";

import { useAppSelector } from "../store";

export const RootNavigator = () => {
	const token = useAppSelector((state) => state.auth.token);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<NavigationContainer>
				{token ? <MainNavigator /> : <AuthNavigator />}
			</NavigationContainer>
		</SafeAreaView>
	);
};
