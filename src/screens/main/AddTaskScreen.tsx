import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useAppDispatch } from "../../store";
import { addTask } from "../../store/tasks/taskSlice";
import { MainScreenProps } from "../../navigation/types";

export default function AddTaskScreen({
	navigation,
}: MainScreenProps<"AddTask">) {
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const handleAddTask = () => {
		if (title.trim()) {
			dispatch(
				addTask({ title: title.trim(), description: description.trim() })
			);
			navigation.goBack();
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
				disabled={!title.trim()}
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
