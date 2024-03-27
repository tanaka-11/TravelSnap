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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function CapturaFotoScreen({ navigation }) {
  const [foto, setFoto] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);
  const [localizacao, setLocalizacao] = useState(null);

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

  const capturarFoto = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });

    if (!imagem.cancelled) {
      await MediaLibrary.saveToLibraryAsync(imagem.assets[0].uri);
      setFoto(imagem.assets[0].uri);
    }
  };

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

  const salvarInfos = async () => {
    try {
      const infos = {
        localizacao: localizacao,
        urlFoto: foto,
        descricao: descricao,
      };
      const nomeArquivo = "dados_salvos.json";
      // Salvar as informações aqui
      console.log("Informações salvas com sucesso!");
      navigation.navigate("Detalhes", { infos });
    } catch (error) {
      console.log("Erro ao salvar as informações", error.message);
    }
  };

  const regiaoInicial = {
    // Brasil
    latitude: -10,
    longitude: -55,
    latitudeDelta: 0.8,
    longitudeDelta: 0.8,
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
              <Button title="Salvar momento" onPress={salvarInfos} />
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
