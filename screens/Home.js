import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Localizacao from "../components/Localizacao";
import SafeContainer from "../components/SafeContainer";
import Camera from "../components/Camera";

export default function Home({ navigation }) {
  return (
    <SafeContainer>
      <View style={estilos.viewTitulo}>
        <Text style={estilos.titulo}>TravelSnap</Text>
      </View>

      <View style={estilos.viewBotoes}>
        <Camera />

        <Button
          title="Favoritos"
          onPress={() => {
            navigation.navigate("Favoritos");
          }}
        />
      </View>
    </SafeContainer>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  viewBotoes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  viewTitulo: {
    alignItems: "center",
    margin: 20,
    justifyContent: "flex-end",
  },

  titulo: {
    fontSize: 22,
  },
});
