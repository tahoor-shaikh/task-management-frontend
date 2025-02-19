export const validateUsername = (
	username: string
): { isValid: boolean; message?: string } => {
	if (!username) {
		return { isValid: false, message: "Username is required" };
	}
	if (username.length < 2) {
		return {
			isValid: false,
			message: "Username must be at least 2 characters long",
		};
	}
	return { isValid: true };
};

export const validateEmail = (
	email: string
): { isValid: boolean; message?: string } => {
	if (!email) {
		return { isValid: false, message: "Email is required" };
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return { isValid: false, message: "Please enter a valid email address" };
	}
	return { isValid: true };
};

export const validatePassword = (
	password: string
): { isValid: boolean; message?: string } => {
	if (!password) {
		return { isValid: false, message: "Password is required" };
	}
	if (password.length < 6) {
		return {
			isValid: false,
			message: "Password must be at least 6 characters long",
		};
	}
	return { isValid: true };
};

export const validateLoginForm = (data: {
	email: string;
	password: string;
}) => {
	const emailValidation = validateEmail(data.email);
	if (!emailValidation.isValid) {
		return emailValidation;
	}

	const passwordValidation = validatePassword(data.password);
	if (!passwordValidation.isValid) {
		return passwordValidation;
	}

	return { isValid: true };
};

export const validateSignupForm = (data: {
	username: string;
	email: string;
	password: string;
}) => {
	const usernameValidation = validateUsername(data.username);
	if (!usernameValidation.isValid) {
		return usernameValidation;
	}

	const emailValidation = validateEmail(data.email);
	if (!emailValidation.isValid) {
		return emailValidation;
	}

	const passwordValidation = validatePassword(data.password);
	if (!passwordValidation.isValid) {
		return passwordValidation;
	}

	return { isValid: true };
};
