import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { userStore } from "@/store/userStore";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const [name, setName] = useState("");
  const setUsername = userStore((state) => state.setUsername);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qui es-tu ?</Text>
      <TextInput
        style={styles.input}
        placeholder="Entre ton prénom"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Commencer"
          onPress={() => {
            setUsername(name);
            router.replace("/");
          }}
          disabled={!name}
          color={!name ? "#ccc" : "blue"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 8,
    overflow: "hidden",
  },
});
