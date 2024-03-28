// Captura.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Vibration,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CapturaFotoScreen({ navigation }) {
  const [foto, setFoto] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);
  const [localizacao, setLocalizacao] = useState(null);

  // useEffect monitorando permissões
  useEffect(() => {
    async function obterLocalizacao() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão negada");
        return;
      }
      let localizacaoAtual = await Location.getCurrentPositionAsync({});
      setMinhaLocalizacao(localizacaoAtual);
    }
    obterLocalizacao();
  }, []);

  // Função de capturarFoto
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

  // Função para marcarLocal
  const marcarLocal = () => {
    if (minhaLocalizacao) {
      setLocalizacao({
        latitude: minhaLocalizacao.coords.latitude,
        longitude: minhaLocalizacao.coords.longitude,
        latitudeDelta: 0.6,
        longitudeDelta: 0.6,
      });
    } else {
      console.log("Localização ainda não disponível.");
    }
  };

  // Função para salvarInfos
  const salvarInfos = async () => {
    const infos = {
      latitude: localizacao.latitude,
      longitude: localizacao.longitude,
      urlFoto: foto,
      descricao: descricao,
    };

    try {
      // Verificação das informações já salvas no AsyncStorage, inicializando como um array vazio caso não haja nada
      const infosSalvas = await AsyncStorage.getItem("@infosSalvas");
      const listaDeInfos = infosSalvas ? JSON.parse(infosSalvas) : [];

      // Verificar se as informações já estão na lista
      const infosJaSalvas = listaDeInfos.some((info) => {
        return (
          info.latitude === infos.latitude &&
          info.longitude === infos.longitude &&
          info.urlFoto === infos.urlFoto &&
          info.descricao === infos.descricao
        );
      });

      if (infosJaSalvas) {
        // Se as informações já estiverem na lista, exibir um alerta e retornar sem salvar novamente
        Alert.alert(
          "Informações já salvas",
          "Essas informações já estão salvas, tente visualiza-las em favoritos.",
          [
            {
              text: "Voltar para Home",
              onPress: () => navigation.navigate("Home"),
            },
          ]
        );
        return;
      }

      // Adicionando as informações na lista
      listaDeInfos.push(infos);

      // Salvando a lista de informações de volta no AsyncStorage
      await AsyncStorage.setItem("@infosSalvas", JSON.stringify(listaDeInfos));

      // Alerta de operação bem sucedida
      Alert.alert(
        "Informações salvas com sucesso!",
        "Obrigada por registrar seu momento",
        [
          {
            text: "Visualizar informações",
            onPress: () => navigation.navigate("Detalhes", { infos }),
          },
        ]
      );
    } catch (error) {
      console.log("Erro ao salvar as informações", error.message);
      Alert.alert("Erro ao salvar as informações", "Tente novamente");
    }
  };

  // Coordenada fixa de são paulo
  const regiaoInicial = {
    // São Paulo
    // -12.498451023969315, -50.5119426152024
    latitude: -12.4984,
    longitude: -50.5119,
    latitudeDelta: 1.2,
    longitudeDelta: 1.2,
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <Text style={styles.titulo}>TravelSnap</Text>

          {foto ? (
            <View>
              <TextInput
                style={styles.input}
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
              <Image source={{ uri: foto }} style={styles.fotoCapturada} />
            </View>
          ) : (
            <Text style={styles.texto}> Comece tirando uma foto! </Text>
          )}
        </View>

        {foto && (
          <View>
            <View style={styles.viewMapa}>
              <MapView
                style={styles.mapa}
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
              <Button title="Salvar informações" onPress={salvarInfos} />
            ) : (
              <Button
                title="Marcar localização da foto"
                onPress={marcarLocal}
              />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  subContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 550,
    maxHeight: "100%",
    margin: 20,
    flex: 1,
  },

  titulo: {
    textAlign: "center",
    fontSize: 32,
    marginBottom: 20,
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
