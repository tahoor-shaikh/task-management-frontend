import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../types";

const initialState: AuthState = {
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		storeAuthData: (state, action: PayloadAction<{ token: string | null }>) => {
			state.token = action.payload.token;
		},
	},
});

export const { storeAuthData } = authSlice.actions;
export default authSlice.reducer;
