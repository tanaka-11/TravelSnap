import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Captura from "./screens/Captura";
import Detalhes from "./screens/Detalhes";
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

        <Stack.Screen
          name="Captura"
          component={Captura}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Detalhes"
          component={Detalhes}
          options={{ title: "Voltar" }}
        />

        <Stack.Screen
          name="Favoritos"
          component={Favoritos}
          options={({ navigation }) => {
            return {
              headerRight: () => (
                <Button
                  title="Home"
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                />
              ),
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
