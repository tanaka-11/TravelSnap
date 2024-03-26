import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas
import Home from "./screens/Home";
import Favoritos from "./screens/Favoritos";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Favoritos" component={Favoritos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
