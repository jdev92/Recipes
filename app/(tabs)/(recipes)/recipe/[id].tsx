import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import data from "@/data.json";
import { userStore } from "@/store/userStore";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

const RecipeScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = data.recipes.find((r) => r.id === id);
  const addToFavorites = userStore((state) => state.addToFavorites);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{recipe?.title}</Text>
        <Pressable
          onPress={() => {
            if (recipe) {
              addToFavorites(recipe.id);
              alert("Recipe added to favorites!");
            }
          }}
        >
          <Feather name="heart" size={24} color="red" />
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Temps total : {recipe?.preparationTime} min
        </Text>
        <Ionicons name="timer-outline" size={24} color="blue" />
      </View>

      <Image source={{ uri: recipe?.img }} style={styles.recipeImage} />

      {/* ingrédients */}
      <View style={styles.ingredientList}>
        <Text style={styles.sectionTitle}>Ingrédients :</Text>
        {recipe?.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.listItem}>
            - {ingredient}
          </Text>
        ))}
      </View>

      {/* étapes */}
      <View style={styles.stepList}>
        <Text style={styles.sectionTitle}>Étapes :</Text>
        {recipe?.steps.map((step, index) => (
          <Text key={index} style={styles.listItem}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    flex: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
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
    color: "#555",
    flex: 1,
  },
  recipeImage: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  ingredientList: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 15,
  },
  stepList: {
    backgroundColor: "#fdfdfd",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
