import { Button, Image, StatusBar, StyleSheet, Text, View } from "react-native";

// Acessando todos recursos da biblioteca imagePicker
import * as ImagePicker from "expo-image-picker";

// Acessando todos recursos da MediaLibrary
import * as MediaLibrary from "expo-media-library";

// Acessando todos recursos da Sharing
import * as Sharing from "expo-sharing";

// Importação da biblioteca de mapa e o sub-componente "Marker"
import MapView, { Marker } from "react-native-maps";

// Importação da biblioteca de localização
import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <View style={estilos.container}>
        <Text>TravelSnap</Text>

        <View>
          <Button title="Tirar Foto" />
        </View>

        <Image />
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
