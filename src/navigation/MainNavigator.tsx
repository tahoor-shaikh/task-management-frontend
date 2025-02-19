import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SCREENS } from "./screens";

import { MainStackParamList } from "./types";

import HomeScreen from "../screens/main/HomeScreen";
import AddTaskScreen from "../screens/main/AddTaskScreen";
import TaskDetailsScreen from "../screens/main/TaskDetailsScreen";

const MainStack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
	return (
		<MainStack.Navigator>
			<MainStack.Screen
				name={SCREENS.HOME}
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
			<MainStack.Screen
				name={SCREENS.ADD_TASK}
				component={AddTaskScreen}
				options={{ title: "Add Task" }}
			/>
			<MainStack.Screen
				name={SCREENS.TASK_DETAILS}
				component={TaskDetailsScreen}
				options={{ title: "Task Details" }}
			/>
		</MainStack.Navigator>
	);
};
