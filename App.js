import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import { AppNavigator } from "./src/infrastructure/navigation/app.navigator";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ThemeProvider>
  );
}
