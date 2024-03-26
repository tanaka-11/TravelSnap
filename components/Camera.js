// Camera.js
import React, { useState, useEffect } from "react";
import { Button, TextInput, View, StyleSheet, Text, Image } from "react-native";
import Localizacao from "./Localizacao";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing"; // Importe o módulo Sharing
import { useNavigation } from "@react-navigation/native";

export default function Camera({ camera }) {
  const navigation = useNavigation();

  const [foto, setFoto] = useState(null);

  useEffect(() => {
    async function permissaoCamera() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }
    permissaoCamera();
  }, []);

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

  const compartilharFoto = async () => {
    await Sharing.shareAsync(foto);
  };

  return (
    <>
      <View>
        {foto ? (
          <View>
            <TextInput style={estilos.input}>
              Digite aqui onde sua foto foi tirada!
            </TextInput>
          </View>
        ) : (
          <Button title="Tirar Foto" onPress={capturarFoto} />
        )}

        {foto ? (
          <View>
            <Image source={{ uri: foto }} style={estilos.fotoCapturada} />
          </View>
        ) : (
          <Text style={estilos.texto}> Comece tirando uma foto! </Text>
        )}

        {/* Renderize o componente Localizacao e passe a função compartilharFoto como propriedade */}
        {foto && <Localizacao compartilharFoto={compartilharFoto} />}
      </View>
    </>
  );
}

const estilos = StyleSheet.create({
  input: {
    borderColor: "#000000",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 6,
  },

  fotoCapturada: {
    width: 300,
    height: 300,
    margin: 10,
  },

  texto: {
    textAlign: "center",
    margin: 10,
  },
});
