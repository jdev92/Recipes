import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import data from "@/data.json";
import { useRouter } from "expo-router";
import { useState } from "react";
import { userStore } from "@/store/userStore";
import Ionicons from "@expo/vector-icons/Ionicons";

const HomeScreen = () => {
  const router = useRouter();
  const [sortAsc, setSortAsc] = useState(true);
  const user = userStore();

  const sortedRecipes = [...data.recipes].sort((a, b) => {
    const timeA = a.preparationTime + a.cookingTime;
    const timeB = b.preparationTime + b.cookingTime;
    return sortAsc ? timeA - timeB : timeB - timeA;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenue {user.username} !</Text>
      <Pressable
        style={styles.sortButton}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setSortAsc(!sortAsc);
        }}
      >
        <Text style={styles.sortText}>
          {sortAsc ? "Trier : Temps croissant" : "Trier : Temps décroissant"}
        </Text>
        <Ionicons name="time-outline" size={24} color="#555" />
      </Pressable>
      <FlatList
        data={sortedRecipes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/recipe/${item.id}`)}
          >
            <Text style={styles.cardText}>{item.title}</Text>
            <Text style={styles.cardTime}>
              {item.preparationTime + item.cookingTime} min
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 15,
  },
  sortText: {
    marginRight: 10,
    fontSize: 16,
    color: "#555",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  cardTime: {
    fontSize: 14,
    color: "#888",
    marginLeft: 10,
  },
});
