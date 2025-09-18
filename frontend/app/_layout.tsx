import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot} from "expo-router";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
import { store } from "@/redux/store";


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });


  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const stripeKey =
  "pk_test_51LyelkSAVdOdLf5gfOn61Erm7ZujAA4BsYpEzsaA2HKX8zLdQx32yLxX3ztd5bumqZuMT0WiWwZA7CJIeVtmgAal00yq5buYGi";

  

  return (
    <Provider store={store}>
      <StripeProvider publishableKey={stripeKey}>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Slot />
          <Toast position="top" topOffset={20} />
        </ThemeProvider>
      </SafeAreaView>
      </StripeProvider>
    </Provider>
  );
}
