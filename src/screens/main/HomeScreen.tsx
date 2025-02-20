import React, { useCallback, useState } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	ActivityIndicator,
	RefreshControl,
} from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
	getTasks,
	deleteTask,
	updateTask,
} from "../../controllers/TasksController";

import { MainScreenProps } from "../../navigation/types";
import { Task } from "../../types";

import { useAppDispatch } from "../../store";
import { storeAuthData } from "../../store/auth/authSlice";

import { toast } from "../../utils/toast";

import { SCREENS } from "../../navigation/screens";

const HomeScreen = ({ navigation }: MainScreenProps<"Home">) => {
	const dispatch = useAppDispatch();

	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	useFocusEffect(
		useCallback(() => {
			getScreenData();
		}, [])
	);

	const getScreenData = async () => {
		await fetchTasks();
	};

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchTasks();
		setRefreshing(false);
	};

	const fetchTasks = async () => {
		try {
			const response = await getTasks();
			setTasks(response);
		} catch (error: any) {
			console.log("Failed to fetch tasks:", error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		dispatch(
			storeAuthData({
				token: null,
			})
		);
	};

	const handleChangePassword = () => {
		navigation.navigate(SCREENS.CHANGE_PASSWORD);
	};

	const handleUpdateTask = async (item: Task) => {
		const oldStatus = item.completed;
		try {
			setTasks((prev) =>
				prev.map((task) =>
					task._id === item._id ? { ...task, completed: !task.completed } : task
				)
			);

			await updateTask(item._id, {
				...item,
				completed: !item.completed,
			});
		} catch (error: any) {
			console.log("Failed to update task:", error);
			toast.error(error.message);

			setTasks((prev) =>
				prev.map((task) =>
					task._id === item._id ? { ...task, completed: oldStatus } : task
				)
			);
		}
	};

	const handleDeleteTask = async (task: Task) => {
		try {
			const taskId = task._id;
			setTasks((prev) => prev.filter((t) => t._id !== taskId));

			await deleteTask(taskId);
		} catch (error: any) {
			console.log("Failed to delete task:", error);

			fetchTasks();

			toast.error(error.message);
		}
	};

	const renderTask = ({ item }: { item: Task }) => (
		<Card style={styles.taskCard}>
			<Card.Content style={styles.taskContent}>
				<View style={{ flex: 1 }}>
					<Text variant="titleMedium" numberOfLines={1}>
						{item.title}
					</Text>
					<Text variant="bodyMedium" numberOfLines={2}>
						{item.description}
					</Text>
				</View>
				<View style={styles.taskActions}>
					<IconButton
						icon={item.completed ? "check-circle" : "circle-outline"}
						onPress={() => handleUpdateTask(item)}
					/>
					<IconButton
						icon="pencil"
						onPress={() =>
							navigation.navigate(SCREENS.TASK_DETAILS, { taskId: item._id })
						}
					/>
					<IconButton icon="delete" onPress={() => handleDeleteTask(item)} />
				</View>
			</Card.Content>
		</Card>
	);

	if (loading) {
		return (
			<View style={[styles.container, styles.centered]}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text variant="headlineMedium">My Tasks</Text>
				<View style={styles.left}>
					<Button onPress={handleChangePassword}>Change Password</Button>
					<Button onPress={handleLogout} style={styles.logout}>
						<Ionicons name="log-out" size={24} />
					</Button>
				</View>
			</View>

			<FlatList
				data={tasks}
				renderItem={renderTask}
				keyExtractor={(item) => item._id}
				contentContainerStyle={styles.taskList}
				refreshControl={
					<RefreshControl
						colors={["#6200EE"]}
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				ListEmptyComponent={
					<Text style={styles.emptyText}>
						No tasks yet. Add your first task!
					</Text>
				}
			/>

			<Button
				mode="contained"
				onPress={() => navigation.navigate(SCREENS.ADD_TASK)}
				style={styles.addButton}
			>
				Add New Task
			</Button>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		marginTop: 16,
		backgroundColor: "#fff",
	},
	centered: {
		justifyContent: "center",
		alignItems: "center",
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
		marginBottom: 4,
		marginHorizontal: 4,
		marginTop: 4,
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
	left: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 30,
	},
	logout: {
		marginLeft: -10,
	},
});
