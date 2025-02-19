import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleComplete, deleteTask } from "../../store/tasks/taskSlice";
import { MainScreenProps } from "../../navigation/types";
import { Task } from "../../types";
import { storeAuthData } from "../../store/auth/authSlice";

export default function HomeScreen({ navigation }: MainScreenProps<"Home">) {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector((state) => state.tasks.tasks);

	const handleLogout = () => {
		dispatch(storeAuthData({ user: null, token: null }));
	};

	const renderTask = ({ item }: { item: Task }) => (
		<Card style={styles.taskCard}>
			<Card.Content style={styles.taskContent}>
				<View style={{ flex: 1 }}>
					<Text variant="titleMedium">{item.title}</Text>
					<Text variant="bodyMedium" numberOfLines={2}>
						{item.description}
					</Text>
				</View>
				<View style={styles.taskActions}>
					<IconButton
						icon={item.completed ? "check-circle" : "circle-outline"}
						onPress={() => dispatch(toggleComplete(item.id))}
					/>
					<IconButton
						icon="pencil"
						onPress={() =>
							navigation.navigate("TaskDetails", { taskId: item.id })
						}
					/>
					<IconButton
						icon="delete"
						onPress={() => dispatch(deleteTask(item.id))}
					/>
				</View>
			</Card.Content>
		</Card>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text variant="headlineMedium">My Tasks</Text>
				<Button onPress={handleLogout}>Logout</Button>
			</View>

			<FlatList
				data={tasks}
				renderItem={renderTask}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.taskList}
				ListEmptyComponent={
					<Text style={styles.emptyText}>
						No tasks yet. Add your first task!
					</Text>
				}
			/>

			<Button
				mode="contained"
				onPress={() => navigation.navigate("AddTask")}
				style={styles.addButton}
			>
				Add New Task
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		marginTop: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	taskList: {
		flexGrow: 1,
	},
	taskCard: {
		marginBottom: 8,
	},
	taskContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	taskActions: {
		flexDirection: "row",
	},
	emptyText: {
		textAlign: "center",
		marginTop: 24,
		opacity: 0.5,
	},
	addButton: {
		marginTop: 16,
	},
});
