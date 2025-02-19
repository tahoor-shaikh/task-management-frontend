import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";

import { toast } from "../../utils/toast";
import { validateSignupForm } from "../../utils/validation";
import { AuthScreenProps } from "../../navigation/types";

import { SignupData } from "../../types";

import { signUpUser } from "../../controllers/AuthController";

import { SCREENS } from "../../navigation/screens";

export default function SignupScreen({
	navigation,
}: AuthScreenProps<"Signup">) {
	const [formData, setFormData] = useState<SignupData>({
		username: __DEV__ ? "test" : "",
		email: __DEV__ ? "test@gmail.com" : "",
		password: __DEV__ ? "test@123" : "",
	});
	const [buttonLoading, setButtonLoading] = useState(false);

	const handleInputChange = (field: keyof SignupData, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSignup = async () => {
		const validation = validateSignupForm(formData);
		if (!validation.isValid) {
			toast.error(validation.message || "Validation failed");
			return;
		}

		try {
			setButtonLoading(true);
			const payload = {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			};

			const response = await signUpUser(payload);

			console.log("Signup response:", response);

			toast.success("Account created successfully!");

			navigation.canGoBack() && navigation.goBack();
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setButtonLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text variant="headlineMedium" style={styles.title}>
				Create Account
			</Text>
			<TextInput
				style={styles.input}
				label="Username"
				value={formData.username}
				onChangeText={(value) => handleInputChange("username", value)}
				autoCapitalize="words"
			/>
			<TextInput
				style={styles.input}
				label="Email"
				value={formData.email}
				onChangeText={(value) => handleInputChange("email", value)}
				autoCapitalize="none"
				keyboardType="email-address"
			/>
			<TextInput
				style={styles.input}
				label="Password"
				value={formData.password}
				onChangeText={(value) => handleInputChange("password", value)}
				secureTextEntry
			/>
			<Button
				loading={buttonLoading}
				disabled={buttonLoading}
				mode="contained"
				onPress={handleSignup}
				style={styles.button}
			>
				Sign Up
			</Button>
			<Button onPress={() => navigation.navigate(SCREENS.LOGIN)}>
				Already have an account? Login
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
	},
	title: {
		textAlign: "center",
		marginBottom: 24,
	},
	input: {
		marginBottom: 16,
	},
	button: {
		marginTop: 8,
		marginBottom: 16,
	},
});
