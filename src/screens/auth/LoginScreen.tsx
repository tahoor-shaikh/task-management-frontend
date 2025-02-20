import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";

import { AuthScreenProps } from "../../navigation/types";
import { LoginPayload } from "../../types";

import { loginUser } from "../../controllers/AuthController";

import { useAppDispatch } from "../../store";
import { storeAuthData } from "../../store/auth/authSlice";

import { toast } from "../../utils/toast";
import { validateLoginForm } from "../../utils/validation";

import { SCREENS } from "../../navigation/screens";

const LoginScreen = ({ navigation }: AuthScreenProps<"Login">) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginPayload>({
    email: __DEV__ ? "test@gmail.com" : "",
    password: __DEV__ ? "test@123" : "",
  });
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleInputChange = (field: keyof LoginPayload, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    const validation = validateLoginForm(formData);
    if (!validation.isValid) {
      toast.error(validation.message || "Validation failed");
      return;
    }

    try {
      setButtonLoading(true);
      const response = await loginUser(formData);
      console.log("Login response:", response);

      dispatch(
        storeAuthData({
          token: response?.token,
        })
      );
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome Back
      </Text>
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
        onPress={handleLogin}
        style={styles.button}
      >
        Login
      </Button>
      <Button onPress={() => navigation.navigate(SCREENS.SIGNUP)}>
        Don't have an account? Sign up
      </Button>
    </View>
  );
};

export default LoginScreen;

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
