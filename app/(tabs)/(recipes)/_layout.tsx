import { Stack, useRouter, useSegments } from "expo-router";
import { Button } from "react-native";
import { userStore } from "@/store/userStore";

const _layout = () => {
  const clearUsername = userStore((state) => state.clearUsername);
  const router = useRouter();
  // const segment = useSegments();
  // console.log(segment);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => (
            <Button
              title="logout"
              onPress={() => {
                clearUsername(), router.replace("/onBoarding");
              }}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default _layout;
