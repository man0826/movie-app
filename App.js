import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StatusBar } from "react-native";
import {
  Provider as PaperProvider,
  DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
} from "react-native-paper";
import {
  NavigationContainer,
  DarkTheme as DarkThemeNavigation,
  DefaultTheme as DefaultThemeNavigation,
} from "@react-navigation/native";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AnimatedSplash from "react-native-animated-splash-screen";

import BottomNavigation from "./src/navigation/BottomNavigation";
import store, { persistor } from "./src/store/";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 4000);
  }, []);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AnimatedSplash
          translucent={true}
          isLoaded={isLoaded}
          logoImage={require("./assets/logo.gif")}
          backgroundColor={"#1a1d28"}
          logoHeight={500}
          logoWidht={500}
        >
          <AppInner />
        </AnimatedSplash>
      </PersistGate>
    </StoreProvider>
  );
};

const AppInner = () => {
  const theme = useSelector((state) => state.theme.theme);

  DefaultThemePaper.colors.primary = "#1ae1f2";
  DarkThemePaper.colors.primary = "#1ae1f2";
  DarkThemePaper.colors.accent = "#1ae1f2";

  DarkThemeNavigation.colors.background = "#192734";
  DarkThemeNavigation.colors.card = "#000";

  return (
    <PaperProvider
      theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <NavigationContainer
        theme={theme === "dark" ? DarkThemeNavigation : DefaultThemeNavigation}
      >
        <BottomNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
