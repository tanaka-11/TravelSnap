import { Button, Pressable, StyleSheet, Text } from "react-native";
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
          options={({ navigation }) => {
            return {
              headerRight: () => (
                <Pressable
                  style={styles.botao}
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                >
                  <Text style={styles.textoBotao}>Home</Text>
                </Pressable>
              ),
            };
          }}
        />

        <Stack.Screen
          name="Favoritos"
          component={Favoritos}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  botao: {
    padding: 10,
    borderRadius: 3,
    backgroundColor: "#679595",
  },

  textoBotao: { color: "#fff" },
});
