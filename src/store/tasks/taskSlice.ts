import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskState } from "../../types";

const initialState: TaskState = {
	tasks: [],
};

const taskSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask: (
			state,
			action: PayloadAction<{ title: string; description: string }>
		) => {
			const newTask: Task = {
				id: Date.now().toString(),
				title: action.payload.title,
				description: action.payload.description,
				completed: false,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			state.tasks.push(newTask);
		},
		updateTask: (
			state,
			action: PayloadAction<{ id: string; title: string; description: string }>
		) => {
			const task = state.tasks.find((t) => t.id === action.payload.id);
			if (task) {
				task.title = action.payload.title;
				task.description = action.payload.description;
				task.updatedAt = new Date().toISOString();
			}
		},
		toggleComplete: (state, action: PayloadAction<string>) => {
			const task = state.tasks.find((t) => t.id === action.payload);
			if (task) {
				task.completed = !task.completed;
				task.updatedAt = new Date().toISOString();
			}
		},
		deleteTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},
	},
});

export const { addTask, updateTask, toggleComplete, deleteTask } =
	taskSlice.actions;
export default taskSlice.reducer;
