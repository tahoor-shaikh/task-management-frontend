import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, ActivityIndicator, Text } from "react-native-paper";

import { MainScreenProps } from "../../navigation/types";

import {
	getTask,
	updateTask,
	deleteTask,
} from "../../controllers/TasksController";

import { Task } from "../../types";

import { toast } from "../../utils/toast";

const TaskDetailsScreen = ({
	navigation,
	route,
}: MainScreenProps<"TaskDetails">) => {
	const { taskId } = route.params;
	const [task, setTask] = useState<Task | null>(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(true);
	const [updating, setUpdating] = useState(false);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		getScreenData();
	}, [taskId]);

	const getScreenData = async () => {
		await fetchTask();
	};

	const fetchTask = async () => {
		try {
			const response = await getTask(taskId);
			const fetchedTask = response;
			setTask(fetchedTask);
			setTitle(fetchedTask.title);
			setDescription(fetchedTask.description);
		} catch (error: any) {
			console.log("Failed to fetch task:", error);

			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleUpdateTask = async () => {
		if (!task || !title.trim() || updating) return;

		setUpdating(true);
		try {
			await updateTask(taskId, {
				title: title.trim(),
				description: description.trim(),
				completed: task.completed,
			});
			navigation.goBack();
		} catch (error) {
			console.log("Failed to update task:", error);
			setUpdating(false);
		}
	};

	const handleDeleteTask = async () => {
		if (!taskId || updating) return;

		setDeleting(true);
		try {
			await deleteTask(taskId);
			navigation.goBack();
		} catch (error) {
			console.log("Failed to delete task:", error);
		} finally {
			setUpdating(false);
		}
	};

	if (loading) {
		return (
			<View style={[styles.container, styles.centered]}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!task) {
		return (
			<View style={[styles.container, styles.centered]}>
				<Text>Task not found</Text>
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
					loading={updating}
					onPress={handleUpdateTask}
					style={[styles.button, styles.updateButton]}
					disabled={!title.trim() || updating || deleting}
				>
					Update Task
				</Button>
				<Button
					mode="contained"
					onPress={handleDeleteTask}
					style={[styles.button, styles.deleteButton]}
					buttonColor="red"
					loading={deleting}
					disabled={updating || deleting}
				>
					Delete Task
				</Button>
			</View>
		</View>
	);
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	centered: {
		justifyContent: "center",
		alignItems: "center",
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
