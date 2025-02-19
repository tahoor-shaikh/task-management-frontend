import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { createTask } from "../../controllers/TasksController";

import { MainScreenProps } from "../../navigation/types";

export default function AddTaskScreen({
	navigation,
}: MainScreenProps<"AddTask">) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);

	const handleAddTask = async () => {
		if (title.trim() && !loading) {
			setLoading(true);
			try {
				const response = await createTask({
					title: title.trim(),
					description: description.trim(),
					completed: false,
				});

				navigation.goBack();
			} catch (error) {
				console.log("Failed to create task:", error);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				label="Title"
				value={title}
				onChangeText={setTitle}
				autoFocus
			/>
			<TextInput
				style={styles.input}
				label="Description"
				value={description}
				onChangeText={setDescription}
				multiline
				numberOfLines={4}
			/>
			<Button
				mode="contained"
				onPress={handleAddTask}
				style={styles.button}
				disabled={!title.trim() || loading}
				loading={loading}
			>
				Add Task
			</Button>
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
	button: {
		marginTop: 8,
	},
});
