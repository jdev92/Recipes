import { Redirect, Tabs } from "expo-router";
import { userStore } from "@/store/userStore";

const TabsLayout = () => {
  const username = userStore((state) => state.username);
  if (!username) {
    return <Redirect href={"/onBoarding"} />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="(recipes)" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;
