import {
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
  // State para guardar a imagem
  const [foto, setFoto] = useState(null);

  // State de permissão para camera
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  // useEffect para a permissão de camera
  useEffect(() => {
    async function permissaoCamera() {
      // CameraStatus guardando a requisição da permissão de camera
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

      // Requisição da permissão recebendo o cameraStatus com o parametro de ter permitido
      requestPermission(cameraStatus === "granted");
    }
    permissaoCamera();
  }, []);

  // Função para capturar foto
  const capturarFoto = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });

    if (!imagem.canceled) {
      await MediaLibrary.saveToLibraryAsync(imagem.assets[0].uri);
      setFoto(imagem.assets[0].uri);
    }
  };

  // Função para acessar biblioteca de fotos
  const escolherFoto = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <View style={estilos.container}>
        <View style={estilos.subContainer}>
          <Text>TravelSnap</Text>

          <View>
            <TextInput>Ola</TextInput>
          </View>

          <View>
            <Image />
          </View>

          <View>
            <Button title="Tirar Foto" onPress={capturarFoto} />
          </View>
        </View>
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
