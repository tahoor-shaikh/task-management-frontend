import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";

import { MainScreenProps } from "../../navigation/types";
import { toast } from "../../utils/toast";
import { changePassword } from "../../controllers/AuthController";
import { validateChangePasswordForm } from "../../utils/validation";

const ChangePassword = ({ navigation }: MainScreenProps<"ChangePassword">) => {
	const [loading, setLoading] = useState(false);

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleChangePassword = async () => {
		const validation = validateChangePasswordForm({
			oldPassword,
			newPassword,
			confirmPassword,
		});

		if (!validation.isValid) {
			toast.error(validation.message || "Validation failed");
			return;
		}

		try {
			setLoading(true);

			const prepareData = {
				oldPassword,
				newPassword,
			};
			const response = await changePassword(prepareData);

			console.log("Change Password response:", response);

			toast.success(response.message);

			navigation.goBack();
		} catch (error: any) {
			console.log("Change Password error:", error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text variant="headlineMedium">Change Password</Text>
			</View>
			<View style={styles.spaceBetween}>
				<View>
					<TextInput
						style={styles.input}
						label="Old Password"
						value={oldPassword}
						onChangeText={setOldPassword}
					/>
					<TextInput
						style={styles.input}
						label="New Password"
						value={newPassword}
						onChangeText={setNewPassword}
					/>
					<TextInput
						style={styles.input}
						label="Confirm New Password"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>
				</View>

				<Button
					mode="contained"
					onPress={handleChangePassword}
					loading={loading}
					disabled={loading}
					style={styles.addButton}
				>
					Change Password
				</Button>
			</View>
		</View>
	);
};

export default ChangePassword;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		justifyContent: "space-between",
		marginTop: 16,
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
	addButton: {
		marginTop: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	spaceBetween: {
		justifyContent: "space-between",
		flex: 1,
	},
});
