import { View, Text, Image, Button, StyleSheet, Share } from "react-native";
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
      const mensagem = `Descrição: ${descricao}\nLatitude: ${latitude}\nLongitude: ${longitude}  `;
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
      <Text style={styles.titulo}>Descrição: {descricao}</Text>

      <Image source={{ uri: urlFoto }} style={styles.fotoCapturada} />

      <MapView ref={mapRef} style={styles.mapa} minDelta={10}>
        <Marker
          coordinate={localizacao}
          title="Local da sua foto!"
          pinColor="blue"
        />
      </MapView>

      <Button title="Compartilhar" onPress={compartilharDetalhes} />
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
    width: 250,
    height: 250,
    margin: 10,
  },

  titulo: {
    fontSize: 20,
  },

  mapa: {
    width: 250,
    height: 250,
    margin: 30,
  },
});
