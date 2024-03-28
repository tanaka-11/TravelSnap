import { View, Text, Image, Button, StyleSheet } from "react-native";

export default function Detalhes({ route }) {
  const { urlFoto, descricao, latitude, longitude } = route.params.infos;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Descrição: {descricao}</Text>
      <Text style={styles.localizacao}>
        Localização: {latitude} e {longitude}
      </Text>
      <Image source={{ uri: urlFoto }} style={styles.fotoCapturada} />
      <Button title="Ir para favoritos" />
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
    width: 300,
    height: 300,
    margin: 10,
  },

  titulo: {
    fontSize: 20,
  },
});
