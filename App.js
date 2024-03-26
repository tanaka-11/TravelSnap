import {
  Alert,
  Button,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";

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

export default function App() {
  // ImagePicker
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
  const compartilarFoto = async () => {
    await Sharing.shareAsync(foto);
  };

  // MapView
  // Coordenadas fixas para o componente "mapview"
  const regiaoInicial = {
    // Brasil
    latitude: -10,
    longitude: -55,
    latitudeDelta: 0.8,
    longitudeDelta: 0.8,
  };

  // State com localização atual do usuario
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);

  // State que define a localização no MapView. Começando nulo, pois o usuario ainda não acionou o botão de "marcarLocal"
  const [localizacao, setLocalizacao] = useState(null);

  // Effect de permissão e coordenadas atuais
  useEffect(() => {
    async function obterLocalizacao() {
      // Guardando permissão em "status"
      const { status } = await Location.requestForegroundPermissionsAsync();

      // Condicional para localização negada
      if (status !== "granted") {
        Alert.alert(
          "Permissão Necessária",
          "Ative a localização para utilizar o app."
        );
        return;
      }

      // Obtendo dados da localização atual
      let localizacaoAtual = await Location.getCurrentPositionAsync({});
      setMinhaLocalizacao(localizacaoAtual);
    }

    obterLocalizacao();
  }, []);

  // Função para marcar coordenadas na posição do usuario
  const marcarLocal = () => {
    if (minhaLocalizacao) {
      setLocalizacao({
        // Capturando novos dados de coordenadas na posição atual
        latitude: minhaLocalizacao.coords.latitude,
        longitude: minhaLocalizacao.coords.longitude,
        latitudeDelta: 0.6,
        longitudeDelta: 0.6,
      });
    } else {
      Alert.alert("Localização ainda não disponível.");
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={estilos.container}>
          <View style={estilos.subContainer}>
            <Text style={estilos.titulo}>TravelSnap</Text>

            {/* Condicional para aparecer somente quando o usuario tirar uma foto */}
            {foto && (
              <View>
                <TextInput style={estilos.input}>
                  Digite aqui onde sua foto foi tirada!
                </TextInput>
              </View>
            )}

            {/* Condicional para aparecer imagem apos a foto ser capturada */}
            {foto ? (
              <View>
                <Image source={{ uri: foto }} style={estilos.fotoCapturada} />
              </View>
            ) : (
              <Text style={estilos.texto}> Comece tirando uma foto! </Text>
            )}

            {/* Condicional para aparecer botão de compartilhar ou de tirar foto */}
            {foto ? (
              <Button title="Compartilhar" onPress={compartilarFoto} />
            ) : (
              <Button title="Tirar Foto" onPress={capturarFoto} />
            )}

            {foto && (
              <View>
                <View style={estilos.viewMapa}>
                  <MapView
                    style={estilos.mapa}
                    region={localizacao ?? regiaoInicial}
                    minZoomLevel={16}
                  >
                    {localizacao && (
                      <Marker
                        coordinate={localizacao}
                        title="Local da sua foto!"
                        pinColor="blue"
                      />
                    )}
                  </MapView>
                </View>

                <Button
                  title="Marcar localização da foto"
                  onPress={marcarLocal}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
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

  subContainer: {
    alignItems: "center",
    marginVertical: 100,
  },

  titulo: {
    textAlign: "center",
    fontSize: 20,
    margin: 10,
  },

  texto: {
    textAlign: "center",
    margin: 10,
  },

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

  mapa: {
    width: 300,
    height: 300,
  },

  viewMapa: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});
