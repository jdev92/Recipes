import { Stack } from "expo-router";
// Sur Android, ajouter dans votre layout racine
import { Platform, UIManager } from "react-native";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Rootlayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default Rootlayout;
