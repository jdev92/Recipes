import { View, Text, FlatList, StyleSheet } from "react-native";
import { userStore } from "@/store/userStore";
import data from "@/data.json";
import { useLocalSearchParams } from "expo-router";

const FavScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const favorites = userStore((state) => state.favorites);
  const allRecipes = data.recipes;
  const recipe = data.recipes.find((r) => r.id === id);
  const favRecipes = allRecipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favRecipes}
        keyExtractor={(item) => {
          return String(item.id);
        }}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.title}</Text>
              <Text style={styles.cardTime}>{item.preparationTime} min</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default FavScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  cardTime: {
    fontSize: 14,
    color: "#888",
  },
});
