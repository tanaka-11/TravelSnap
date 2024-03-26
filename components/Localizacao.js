// Localizacao.js
import React, { useState, useEffect } from "react";
import { Button, View, StyleSheet, Alert, Text } from "react-native";
import SafeContainer from "../components/SafeContainer";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Localizacao({ compartilharFoto }) {
  const regiaoInicial = {
    latitude: -10,
    longitude: -55,
    latitudeDelta: 0.8,
    longitudeDelta: 0.8,
  };

  const [minhaLocalizacao, setMinhaLocalizacao] = useState(null);
  const [localizacao, setLocalizacao] = useState(null);

  useEffect(() => {
    async function obterLocalizacao() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão Necessária",
          "Ative a localização para utilizar o app."
        );
        return;
      }

      let localizacaoAtual = await Location.getCurrentPositionAsync({});
      setMinhaLocalizacao(localizacaoAtual);
    }

    obterLocalizacao();
  }, []);

  const marcarLocal = () => {
    if (minhaLocalizacao) {
      setLocalizacao({
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
    <SafeContainer>
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

      {localizacao && (
        <Button title="Compartilhar" onPress={compartilharFoto} />
      )}

      {!localizacao && (
        <Button title="Marcar localização da foto" onPress={marcarLocal} />
      )}
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
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
