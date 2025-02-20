import React, { useEffect } from "react";
import { Appearance } from "react-native";
import Toast from "react-native-toast-message";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { store, persistor } from "./src/store";

import { RootNavigator } from "./src/navigation";

export default function App() {
	useEffect(() => {
		Appearance.setColorScheme("light");
	}, []);

	return (
		<>
			<ReduxProvider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<PaperProvider>
						<SafeAreaProvider>
							<GestureHandlerRootView style={{ flex: 1 }}>
								<RootNavigator />
							</GestureHandlerRootView>
						</SafeAreaProvider>
					</PaperProvider>
				</PersistGate>
			</ReduxProvider>
			<Toast />
		</>
	);
}
