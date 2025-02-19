import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, ActivityIndicator } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateTask, deleteTask } from "../../store/tasks/taskSlice";
import { MainScreenProps } from "../../navigation/types";

export default function TaskDetailsScreen({
	navigation,
	route,
}: MainScreenProps<"TaskDetails">) {
	const dispatch = useAppDispatch();
	const { taskId } = route.params;

	const task = useAppSelector((state) =>
		state.tasks.tasks.find((t) => t.id === taskId)
	);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setDescription(task.description);
		}
	}, [task]);

	const handleUpdateTask = () => {
		if (taskId && title.trim()) {
			dispatch(
				updateTask({
					id: taskId,
					title: title.trim(),
					description: description.trim(),
				})
			);
			navigation.goBack();
		}
	};

	const handleDeleteTask = () => {
		if (taskId) {
			dispatch(deleteTask(taskId));
			navigation.goBack();
		}
	};

	if (!task) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				label="Title"
				value={title}
				onChangeText={setTitle}
			/>
			<TextInput
				style={styles.input}
				label="Description"
				value={description}
				onChangeText={setDescription}
				multiline
				numberOfLines={4}
			/>
			<View style={styles.buttonContainer}>
				<Button
					mode="contained"
					onPress={handleUpdateTask}
					style={[styles.button, styles.updateButton]}
					disabled={!title.trim()}
				>
					Update Task
				</Button>
				<Button
					mode="contained"
					onPress={handleDeleteTask}
					style={[styles.button, styles.deleteButton]}
					buttonColor="red"
				>
					Delete Task
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	input: {
		marginBottom: 16,
		backgroundColor: "transparent",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 16,
	},
	button: {
		flex: 1,
		marginHorizontal: 4,
	},
	updateButton: {
		backgroundColor: "#4CAF50",
	},
	deleteButton: {
		backgroundColor: "#f44336",
	},
});
