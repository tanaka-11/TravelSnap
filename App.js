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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // ImagePicker
  // State para guardar a imagem
  const [foto, setFoto] = useState(null);

  // State para guardar descrição da imagem
  const [descricao, setDescricao] = useState("");

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

  // Função para compartilhar imagem de fotos
  // const compartilarFoto = async () => {
  //   await Sharing.shareAsync(foto);
  // };

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

  // Função para salvar informações de localizacao e foto
  const salvarInfos = async (localizacao, urlFoto, descricao) => {
    try {
      const infos = {
        localizacao: localizacao,
        urlFoto: urlFoto,
        descricao: descricao,
      };
      const nomeArquivo = "dados_salvos.json";
      await AsyncStorage.setItem(nomeArquivo, JSON.stringify(infos));
      Alert.alert("Momento salvo com sucesso!");
    } catch (error) {
      Alert.alert("Erro ao salvar as informações" + error.message);
    }
  };
  return (
    <>
      <StatusBar style="light" />
      <ScrollView>
        <View style={estilos.container}>
          <View style={estilos.subContainer}>
            <Text style={estilos.titulo}>TravelSnap</Text>

            {/* Condicional para aparecer somente quando o usuario tirar uma foto */}
            {foto ? (
              <View>
                <TextInput
                  style={estilos.input}
                  placeholder="Digite aqui onde sua foto foi tirada!"
                  onChangeText={(text) => setDescricao(text)}
                />
              </View>
            ) : (
              <Button title="Tirar Foto" onPress={capturarFoto} />
            )}

            {/* Condicional para aparecer imagem apos a foto ser capturada */}
            {foto ? (
              <View>
                <Image source={{ uri: foto }} style={estilos.fotoCapturada} />
              </View>
            ) : (
              <Text style={estilos.texto}> Comece tirando uma foto! </Text>
            )}

            {foto && (
              <View>
                <View style={estilos.viewMapa}>
                  <MapView
                    style={estilos.mapa}
                    region={localizacao ?? regiaoInicial}
                    minZoomLevel={15}
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

                {localizacao ? (
                  <Button
                    title="Salvar momento"
                    onPress={() => salvarInfos(localizacao, foto, descricao)}
                  />
                ) : (
                  <Button
                    title="Marcar localização da foto"
                    onPress={marcarLocal}
                  />
                )}
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
