import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Share,
  Pressable,
} from "react-native";
import { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";

export default function Detalhes({ route }) {
  // Desestruturando dados vindo da função salvarInfos
  const { urlFoto, descricao, localizacao } = route.params.infos;

  // hook useRef
  const mapRef = useRef(null);

  // Função para compartilhar
  const compartilharDetalhes = async () => {
    try {
      const mensagem = `Descrição: ${descricao}\nLatitude: ${localizacao}  `;
      await Share.share({
        message: mensagem,
        url: urlFoto,
      });
    } catch (error) {
      console.error("Erro ao compartilhar:", error.message);
    }
  };

  // useEffect para o mapa
  useEffect(() => {
    if (localizacao) {
      mapRef.current?.animateToRegion({
        latitude: localizacao.latitude,
        longitude: localizacao.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [localizacao]);

  return (
    <View style={styles.container}>
      <View style={styles.viewDetalhes}>
        <Text style={styles.titulo}>
          <Text style={styles.tituloDestaque}>Descrição: </Text>
          {descricao}
        </Text>

        <Image source={{ uri: urlFoto }} style={styles.fotoCapturada} />

        <View style={styles.viewMapa}>
          <MapView ref={mapRef} style={styles.mapa} minDelta={10}>
            <Marker
              coordinate={localizacao}
              title="Local da sua foto!"
              pinColor="blue"
            />
          </MapView>
        </View>

        <Pressable style={styles.botao} onPress={compartilharDetalhes}>
          <Text style={styles.textoBotao}>Compartilhar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  fotoCapturada: {
    width: 280,
    height: 280,
    margin: 10,
    borderColor: "#679595",
    borderWidth: 3,
    borderRadius: 3,
  },

  titulo: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },

  tituloDestaque: {
    color: "#679595",
    fontWeight: "bold",
  },

  mapa: {
    width: 280,
    height: 280,
  },

  viewMapa: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderColor: "#679595",
    borderWidth: 3,
    borderRadius: 3,
  },

  viewDetalhes: {
    // backgroundColor: "rgba(103,149,149,0.30)",
    padding: 40,
    borderRadius: 6,
    alignItems: "center",
  },

  botao: {
    padding: 10,
    borderColor: "#e6e6e6",
    borderWidth: 3,
    borderRadius: 6,
    backgroundColor: "#679595",
  },

  textoBotao: { color: "#fff" },
});
