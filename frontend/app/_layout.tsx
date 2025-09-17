import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "@/redux/store";
import { useEffect } from "react";
import { loadUser } from "@/redux/actions/userActions";


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });


  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Slot />
          <Toast position="top" topOffset={20} />
        </ThemeProvider>
      </SafeAreaView>
    </Provider>
  );
}
